import { Prisma, CoreEntityType } from '@prisma/client';

import { createCoreEntity } from '@/db';

import { CreateContactInputType } from '@/server/api/routers/contact';
import { CreateCompanyInputType } from '@/server/api/routers/company';
import { CreatePropertyInputType } from '@/server/api/routers/property';
import {
  contactDataMapper,
  companyDataMapper,
  propertyDataMapper,
} from '@/graphql/mappers';

export const contactCreator = async ({
  data,
  user,
}: {
  data: CreateContactInputType;
  user: string;
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

  const result = await createCoreEntity(contactCreateInput);

  return contactDataMapper(result);
};

export const companyCreator = async ({
  data,
  user,
}: {
  data: CreateCompanyInputType;
  user: string;
}) => {
  const { name, address, attributes, linkedEntity } = data;

  const coreEntityCreateInput = {
    type: CoreEntityType.COMPANY,
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

  return companyDataMapper(result);
};

export const propertyCreator = async ({
  data,
  user,
}: {
  data: CreatePropertyInputType;
  user: string;
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

  return propertyDataMapper(result);
};
