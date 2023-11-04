import { Prisma, CoreEntityType } from '@prisma/client';

import {
  getOwnedCoreEntities,
  getOwnedCoreEntity,
  updateCoreEntity,
  deleteCoreEntity,
  CoreEntityResult,
} from '../db';
import {
  Resolvers,
  Company,
  InputMaybe,
  CoreEntityFilter,
  MutationUpdateCompanyArgs,
} from '../generated/resolvers-types';

import { companyDataMapper } from './mappers';

interface CoreEntitiesResolverArgs {
  entityType: CoreEntityType;
  filter?: InputMaybe<CoreEntityFilter>;
  user?: string;
  dataMapper: (entity: CoreEntityResult) => Company;
}

interface CoreEntityResolverArgs {
  id: string;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Company;
}

interface CoreEntityUpdaterArgs {
  id: string;
  data: MutationUpdateCompanyArgs;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Company;
}

interface CoreEntityDeleterArgs {
  id: string;
  user: string;
  dataMapper: (entity: CoreEntityResult) => Company;
}

export const coreEntityResolver = async ({
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
    filter: null,
    withUserId: user,
  });

  const results = result.map((entity: CoreEntityResult) => {
    return dataMapper(entity);
  });

  return results;
};

export const coreEntityUpdater = async ({
  id,
  data,
  user,
  dataMapper,
}: CoreEntityUpdaterArgs) => {
  const { name, phone, email, address, attributes } = data;

  const coreEntityUpdateInput = {
    meta: {
      update: {
        name,
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
  },
  Mutation: {
    updateCompany: async (_, data, contextValue) =>
      coreEntityUpdater({
        id: data.id,
        data,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
    deleteCompany: async (_, { id }, contextValue) =>
      coreEntityDeleter({
        id,
        user: contextValue.user?.id,
        dataMapper: companyDataMapper,
      }) as Promise<Company>,
  },
};

export default resolvers;
