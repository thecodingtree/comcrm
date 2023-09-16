import { CoreEntityType } from '@prisma/client';
import prisma, { getCoreEntities, CoreEntityResult } from '../db';
import {
  Resolvers,
  Contact,
  Company,
  Property,
  InputMaybe,
  CoreEntityFilter,
} from '../generated/resolvers-types';

interface CoreEntityResolverArgs {
  entityType: CoreEntityType;
  filter?: InputMaybe<CoreEntityFilter>;
  dataMapper: (entity: CoreEntityResult) => Contact | Company | Property;
}

const contactDataMapper = (entity: CoreEntityResult): Contact => {
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
};

const companyDataMapper = (entity: CoreEntityResult): Company => {
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
};

const propertyDataMapper = (entity: CoreEntityResult): Property => {
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
};

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
      const entity = await prisma.coreEntity.findUnique({
        where: { id },
        include: {
          meta: { include: { address: true } },
          attributes: true,
          user: true,
        },
      });

      // TODO: Error handling?
      if (!entity) {
        throw new Error('Contact not found');
      }

      return contactDataMapper(entity);
    },
    companies: async (_, { filter }) =>
      coreEntityResolver({
        entityType: CoreEntityType.COMPANY,
        filter,
        dataMapper: companyDataMapper,
      }) as Promise<Company[]>,
    company: async (_, { id }) => {
      const entity = await prisma.coreEntity.findUnique({
        where: { id },
        include: {
          meta: { include: { address: true } },
          attributes: true,
          user: true,
        },
      });

      // TODO: Error handling?
      if (!entity) {
        throw new Error('Company not found');
      }

      return companyDataMapper(entity);
    },
    properties: async (_, { filter }) =>
      coreEntityResolver({
        entityType: CoreEntityType.PROPERTY,
        filter,
        dataMapper: propertyDataMapper,
      }) as Promise<Property[]>,
    property: async (_, { id }) => {
      const entity = await prisma.coreEntity.findUnique({
        where: { id },
        include: {
          meta: { include: { address: true } },
          attributes: true,
          user: true,
        },
      });

      // TODO: Error handling?
      if (!entity) {
        throw new Error('Property not found');
      }

      return propertyDataMapper(entity);
    },
  },
};

export default resolvers;
