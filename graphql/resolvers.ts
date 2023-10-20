import { Prisma, CoreEntityType } from '@prisma/client';

import {
  getOwnedCoreEntities,
  getOwnedCoreEntity,
  createCoreEntity,
  updateCoreEntity,
  deleteCoreEntity,
  CoreEntityResult,
} from '../db';
import {
  Resolvers,
  Contact,
  Company,
  Property,
  InputMaybe,
  CoreEntityFilter,
  MutationCreateContactArgs,
  MutationCreateCompanyArgs,
  MutationCreatePropertyArgs,
  MutationUpdateContactArgs,
} from '../generated/resolvers-types';

import {
  contactDataMapper,
  companyDataMapper,
  propertyDataMapper,
} from './mappers';

interface CoreEntitiesResolverArgs {
  entityType: CoreEntityType;
  filter?: InputMaybe<CoreEntityFilter>;
  user?: string;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityResolverArgs {
  id: string;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityCreatorArgs {
  entityType: CoreEntityType;
  data: MutationCreateContactArgs &
    MutationCreateCompanyArgs &
    MutationCreatePropertyArgs;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityUpdaterArgs {
  id: string;
  data: MutationUpdateContactArgs;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityDeleterArgs {
  id: string;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

const coreEntityResolver = async ({
  id,
  user,
  dataMapper,
}: CoreEntityResolverArgs) => {
  const result = await getOwnedCoreEntity(id, user);

  return result ? dataMapper(result) : null;
};

export const coreEntitiesResolver = async ({
  entityType,
  filter,
  user,
  dataMapper,
}: CoreEntitiesResolverArgs) => {
  const result = await getOwnedCoreEntities({
    entityType,
    filter,
    withUserId: user,
  });

  const results = result.map((entity: CoreEntityResult) => {
    return dataMapper(entity);
  });

  return results;
};

const coreEntityCreator = async ({
  entityType,
  data,
  dataMapper,
}: CoreEntityCreatorArgs) => {
  const { user, name, surName, address, attributes, linkedEntity } = data;

  const coreEntityCreateInput = {
    type: entityType,
    meta: {
      create: {
        name,
        surName: surName ? surName : '',
        address: address
          ? {
              create: address,
            }
          : undefined,
      },
    },
    attributes: {
      create: attributes,
    },
    user: {
      connect: {
        id: user,
      },
    },
    linkedEntities: linkedEntity
      ? {
          connect: {
            id: linkedEntity,
          },
        }
      : undefined,
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity(coreEntityCreateInput);

  return dataMapper(result);
};

const coreEntityUpdater = async ({
  id,
  data,
  user,
  dataMapper,
}: CoreEntityUpdaterArgs) => {
  const { name, surName, phone, email, address, attributes } = data;

  const coreEntityUpdateInput = {
    meta: {
      update: {
        name,
        surName,
        phone,
        email,
        address: address
          ? {
              create: address,
            }
          : undefined,
      },
    },
    attributes: {
      create: attributes,
    },
  } as Prisma.CoreEntityUpdateInput;

  const result = await updateCoreEntity(id, user, coreEntityUpdateInput);

  if (!result) {
    throw new Error(`CoreEntity with ID ${id} not found`);
  }

  return dataMapper(result);
};

const coreEntityDeleter = async ({
  id,
  user,
  dataMapper,
}: CoreEntityDeleterArgs) => {
  const result = await deleteCoreEntity(id, user);

  if (!result) {
    throw new Error(`CoreEntity with ID ${id} not found`);
  }

  return dataMapper(result);
};

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, contextValue) => {
      return contextValue.user;
    },
    contacts: async (_, { filter }, contextValue) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.CONTACT,
        filter,
        user: contextValue.user?.id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact[]>,
    contact: async (_, { id }, contextValue) =>
      coreEntityResolver({
        id,
        user: contextValue.user?.id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    companies: async (_, { filter }, contextValue) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.COMPANY,
        filter,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company[]>,
    company: async (_, { id }, contextValue) =>
      coreEntityResolver({
        id,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    properties: async (_, { filter }, contextValue) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.PROPERTY,
        filter,
        user: contextValue.user?.id,
        dataMapper: propertyDataMapper,
      }) as Promise<Property[]>,
    property: async (_, { id }, contextValue) =>
      coreEntityResolver({
        id,
        user: contextValue.user?.id,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
  },
  Mutation: {
    createContact: async (_, data) =>
      coreEntityCreator({
        entityType: CoreEntityType.CONTACT,
        data,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    createCompany: async (_, data) =>
      coreEntityCreator({
        entityType: CoreEntityType.COMPANY,
        data,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    createProperty: async (_, data) =>
      coreEntityCreator({
        entityType: CoreEntityType.PROPERTY,
        data,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
    updateContact: async (_, data, contextValue) =>
      coreEntityUpdater({
        id: data.id,
        data,
        user: contextValue.user?.id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    updateCompany: async (_, data, contextValue) =>
      coreEntityUpdater({
        id: data.id,
        data,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    updateProperty: async (_, data, contextValue) =>
      coreEntityUpdater({
        id: data.id,
        data,
        user: contextValue.user?.id,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
    deleteContact: async (_, { id }, contextValue) =>
      coreEntityDeleter({
        id,
        user: contextValue.user?.id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    deleteCompany: async (_, { id }, contextValue) =>
      coreEntityDeleter({
        id,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    deleteProperty: async (_, { id }, contextValue) =>
      coreEntityDeleter({
        id,
        user: contextValue.user?.id,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
  },
};

export default resolvers;
