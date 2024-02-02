import { CoreEntityResult } from '@/server/coreEntities';
import { ContactType, CompanyType, PropertyType } from '@/server/sharedTypes';

export const contactDataMapper = (entity: CoreEntityResult): ContactType => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    surName: meta?.surName!,
    address: meta?.address,
    image: meta?.image,
    email: meta?.email,
    phone: meta?.phone,
    attributes,
    user: user?.id ?? '',
    createdAt,
    updatedAt,
  } as ContactType;
};

export const companyDataMapper = (entity: CoreEntityResult): CompanyType => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    address: meta?.address || {} || undefined,
    phone: meta?.phone || undefined,
    email: meta?.email || undefined,
    attributes,
    user: user?.id ?? '',
    createdAt,
    updatedAt,
  } as CompanyType;
};

export const propertyDataMapper = (entity: CoreEntityResult): PropertyType => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    user: user?.id ?? '',
    createdAt,
    updatedAt,
  } as PropertyType;
};
