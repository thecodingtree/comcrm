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
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

interface CoreEntitiesResolverArgs {
  entityType: CoreEntityType;
  filter?: InputMaybe<CoreEntityFilter>;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

interface CoreEntityResolverArgs {
  id: string;
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
  id,
  dataMapper,
}: CoreEntityResolverArgs) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const result = await getCoreEntity(id, session.user.id as string);

  return dataMapper(result);
};

export const coreEntitiesResolver = async ({
  entityType,
  filter,
  dataMapper,
}: CoreEntitiesResolverArgs) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const result = await getCoreEntities({
    entityType,
    filter,
    withUserId: session.user.id,
  });

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
    me: async (_, __, contextValue) => {
      return contextValue.user;
    },
    allUsers: async () => {
      return await prisma.user.findMany();
    },
    contacts: async (_, { filter }) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.CONTACT,
        filter,
        dataMapper: contactDataMapper,
      }) as Promise<Contact[]>,
    contact: async (_, { id }) =>
      coreEntityResolver({
        id,
        dataMapper: contactDataMapper,
      }) as Promise<Contact>,
    companies: async (_, { filter }) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.COMPANY,
        filter,
        dataMapper: companyDataMapper,
      }) as Promise<Company[]>,
    company: async (_, { id }) =>
      coreEntityResolver({
        id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    properties: async (_, { filter }) =>
      coreEntitiesResolver({
        entityType: CoreEntityType.PROPERTY,
        filter,
        dataMapper: propertyDataMapper,
      }) as Promise<Property[]>,
    property: async (_, { id }) =>
      coreEntityResolver({
        id,
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
