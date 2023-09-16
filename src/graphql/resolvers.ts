import { Prisma, CoreEntityType } from '@prisma/client';
import prisma, {
  getCoreEntities,
  getCoreEntity,
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

interface CoreEntityResolverArgs {
  entityType: CoreEntityType;
  filter?: InputMaybe<CoreEntityFilter>;
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
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityDeleterArgs {
  id: string;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

const coreEntityResolver = async ({
  entityType,
  filter,
  dataMapper,
}: CoreEntityResolverArgs) => {
  const result = await getCoreEntities({ entityType, filter });

  const results = result.map((entity) => {
    return dataMapper(entity);
  });

  return results;
};

const coreEntityCreator = async ({
  entityType,
  data,
  dataMapper,
}: CoreEntityCreatorArgs) => {
  const { user, name, surName, address, attributes } = data;

  const coreEntityCreateInput = {
    type: entityType,
    meta: {
      create: {
        name,
        surName,
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
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity(coreEntityCreateInput);

  return dataMapper(result);
};

const coreEntityUpdater = async ({
  id,
  data,
  dataMapper,
}: CoreEntityUpdaterArgs) => {
  const { name, surName, address, attributes } = data;

  const coreEntityUpdateInput = {
    meta: {
      update: {
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
  } as Prisma.CoreEntityUpdateInput;

  const result = await updateCoreEntity(id, coreEntityUpdateInput);

  return dataMapper(result);
};

const coreEntityDeleter = async ({ id, dataMapper }: CoreEntityDeleterArgs) => {
  const result = await deleteCoreEntity(id);

  return dataMapper(result);
};

const resolvers: Resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
    contacts: async (_, { filter }) =>
      coreEntityResolver({
        entityType: CoreEntityType.CONTACT,
        filter,
        dataMapper: contactDataMapper,
      }) as Promise<Contact[]>,
    contact: async (_, { id }) => {
      const entity = await getCoreEntity(id);
      return contactDataMapper(entity);
    },
    companies: async (_, { filter }) =>
      coreEntityResolver({
        entityType: CoreEntityType.COMPANY,
        filter,
        dataMapper: companyDataMapper,
      }) as Promise<Company[]>,
    company: async (_, { id }) => {
      const entity = await getCoreEntity(id);
      return companyDataMapper(entity);
    },
    properties: async (_, { filter }) =>
      coreEntityResolver({
        entityType: CoreEntityType.PROPERTY,
        filter,
        dataMapper: propertyDataMapper,
      }) as Promise<Property[]>,
    property: async (_, { id }) => {
      const entity = await getCoreEntity(id);
      return propertyDataMapper(entity);
    },
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
    updateContact: async (_, data) =>
      coreEntityUpdater({
        id: data.id,
        data,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    updateCompany: async (_, data) =>
      coreEntityUpdater({
        id: data.id,
        data,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    updateProperty: async (_, data) =>
      coreEntityUpdater({
        id: data.id,
        data,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
    deleteContact: async (_, { id }) =>
      coreEntityDeleter({
        id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    deleteCompany: async (_, { id }) =>
      coreEntityDeleter({
        id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    deleteProperty: async (_, { id }) =>
      coreEntityDeleter({
        id,
        dataMapper: propertyDataMapper,
      }) as Promise<Property>,
  },
};

export default resolvers;
