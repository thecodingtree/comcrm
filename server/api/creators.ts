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
  SessionUser,
} from '@/server/sharedTypes';

export const contactCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreateContactInputType;
  user?: SessionUser;
}) => {
  const { name, surName, phone, email, address, attributes } = data;

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
    creator: {
      connect: { id: user?.id },
    },
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, user, data: contactCreateInput });

  return contactDataMapper(result, user);
};

export const companyCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreateCompanyInputType;
  user?: SessionUser;
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
    creator: {
      connect: { id: user?.id },
    },
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, data: coreEntityCreateInput });

  return companyDataMapper(result, user);
};

export const propertyCreator = async ({
  db,
  data,
  user,
}: {
  db: PrismaClient;
  data: CreatePropertyInputType;
  user?: SessionUser;
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
    creator: {
      connect: { id: user?.id },
    },
  } as Prisma.CoreEntityCreateInput;

  const result = await createCoreEntity({ db, data: coreEntityCreateInput });

  return propertyDataMapper(result, user);
};
