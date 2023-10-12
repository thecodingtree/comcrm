import { Prisma, CoreEntityType } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import prisma, {
  getCoreEntities,
  getCoreEntity,
  createCoreEntity,
  updateCoreEntity,
  deleteCoreEntity,
  CoreEntityResult,
} from '../db';

import {
  Company,
  Contact,
  Property,
  CoreEntityFilter,
  AddressInput,
  AttributeInput,
  MutationCreateContactArgs,
  MutationCreatePropertyArgs,
} from '../generated/resolvers-types';
import { companyDataMapper } from '@/graphql/mappers';

export type EntityDataMapperResult = Contact | Company | Property;

interface EntitiesForUserArgs {
  entityType: CoreEntityType;
  filter?: CoreEntityFilter;
  dataMapper: (entity: CoreEntityResult) => EntityDataMapperResult;
}

export async function getCompaniesForUser(
  filter: CoreEntityFilter = {}
): Promise<Company[]> {
  return (await getEntitiesForUser({
    entityType: CoreEntityType.COMPANY,
    filter,
    dataMapper: (entity) => {
      const { id, meta, attributes, user, createdAt, updatedAt } = entity;
      return {
        id,
        name: meta?.name,
        address: meta?.address,
        attributes,
        user,
        createdAt,
        updatedAt,
      } as Company;
    },
  })) as Company[];
}

export async function getContactsForUser(
  filter: CoreEntityFilter = {}
): Promise<EntityDataMapperResult[]> {
  return await getEntitiesForUser({
    entityType: CoreEntityType.CONTACT,
    filter,
    dataMapper: (entity) => {
      const { id, meta, attributes, user, createdAt, updatedAt } = entity;
      return {
        id,
        name: meta?.name,
        surName: meta?.surName,
        address: meta?.address,
        attributes,
        user,
        createdAt,
        updatedAt,
      } as Contact;
    },
  });
}

export async function getPropertiesForUser(
  filter: CoreEntityFilter = {}
): Promise<EntityDataMapperResult[]> {
  return await getEntitiesForUser({
    entityType: CoreEntityType.PROPERTY,
    filter,
    dataMapper: (entity) => {
      const { id, meta, attributes, user, createdAt, updatedAt } = entity;
      return {
        id,
        name: meta?.name,
        address: meta?.address,
        attributes,
        user,
        createdAt,
        updatedAt,
      } as Property;
    },
  });
}

async function getEntitiesForUser({
  entityType,
  filter,
  dataMapper,
}: EntitiesForUserArgs) {
  'use server';
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  } else {
    filter = {
      ...filter,
      user: session.user.id,
    };
  }

  const result = await getCoreEntities({
    entityType,
    filter,
  });

  const results = result.map((entity) => {
    return dataMapper(entity);
  });

  return results;
}

export async function createCompany() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  // TODO: TAKE DATA FROM INPUT
  const data = {
    name: 'Company Name',
    address: {
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip',
    },
    attributes: [
      {
        name: 'attribute-1',
        value: 'Attribute 1',
      },
      { name: 'attribute-2', value: 'Attribute 2' },
    ],
    user: session?.user.id ?? '',
  } as CreateCompanyArgs;

  return await coreEntityCreator({
    entityType: CoreEntityType.COMPANY,
    data,
    dataMapper: companyDataMapper as (entity: CoreEntityResult) => Company,
  });
}

type CreateCompanyArgs = {
  address?: AddressInput;
  attributes?: AttributeInput[];
  name: string;
  user: string;
};

interface CoreEntityCreatorArgs {
  entityType: CoreEntityType;
  data: MutationCreateContactArgs &
    CreateCompanyArgs &
    MutationCreatePropertyArgs;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

async function coreEntityCreator({
  entityType,
  data,
  dataMapper,
}: CoreEntityCreatorArgs): Promise<EntityDataMapperResult> {
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

  const result = (await createCoreEntity(
    coreEntityCreateInput
  )) as CoreEntityResult;

  return dataMapper(result);
}
