import { Prisma, CoreEntityType, CoreEntity } from '@prisma/client';

import { CoreEntityResult, createCoreEntity } from '@/db';

import { CreateContactInputType } from '@/server/api/routers/contact';
import { CreateCompanyInputType } from '@/server/api/routers/company';
import { CreatePropertyInputType } from '@/server/api/routers/property';
import {
  contactDataMapper,
  companyDataMapper,
  propertyDataMapper,
} from '@/graphql/mappers';

interface CoreEntityCreatorArgs {
  entityType: CoreEntityType;
  data: CreateContactInputType &
    CreateCompanyInputType &
    CreatePropertyInputType;
  user: string;
  dataMapper: (entity: CoreEntityResult) => CoreEntity;
}

export const contactCreator = async ({
  data,
  user,
}: {
  data: CreateContactInputType;
  user: string;
}) => {
  const { name, surName, address, attributes, linkedEntity } = data;

  const coreEntityCreateInput = {
    type: CoreEntityType.CONTACT,
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
