import { Prisma, CoreEntityType, PrismaClient } from '@prisma/client';

import { createCoreEntity } from '@/server/coreEntities';

import {
  contactDataMapper,
  companyDataMapper,
  propertyDataMapper,
} from '@/server/api/mappers';

import {
  CreateCompanyInputType,
  CreateContactInputType,
  CreatePropertyInputType,
} from '@/server/sharedTypes';

export const contactCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreateContactInputType;
  user?: string;
}) => {
  const { name, surName, phone, email, address, attributes, linkedEntity } =
    data;

  const contactCreateInput = {
    type: CoreEntityType.CONTACT,
    meta: {
      create: {
        name,
        surName: surName ? surName : '',
        phone,
        email,
        address: address
          ? {
              create: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
              },
            }
          : undefined,
      },
    },
    attributes: attributes ? { create: attributes } : undefined,
    userId: user ? user : null,
    linkedEntities: linkedEntity
      ? {
          connect: {
            id: linkedEntity,
          },
        }
      : undefined,
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, data: contactCreateInput });

  return contactDataMapper(result);
};

export const companyCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreateCompanyInputType;
  user?: string;
}) => {
  const { name, phone, email, address, attributes, linkedEntity } = data;

  const coreEntityCreateInput = {
    type: CoreEntityType.COMPANY,
    meta: {
      create: {
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
    userId: user ? user : null,
    linkedEntities: linkedEntity
      ? {
          connect: {
            id: linkedEntity,
          },
        }
      : undefined,
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, data: coreEntityCreateInput });

  return companyDataMapper(result);
};

export const propertyCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreatePropertyInputType;
  user?: string;
}) => {
  const { name, address, attributes, linkedEntity } = data;

  const coreEntityCreateInput = {
    type: CoreEntityType.PROPERTY,
    meta: {
      create: {
        name,
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
    userId: user ? user : null,
    linkedEntities: linkedEntity
      ? {
          connect: {
            id: linkedEntity,
          },
        }
      : undefined,
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, data: coreEntityCreateInput });

  return propertyDataMapper(result);
};
