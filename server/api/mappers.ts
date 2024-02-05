import { CoreEntityResult } from '@/server/coreEntities';
import { ContactType, CompanyType, PropertyType } from '@/server/sharedTypes';

export const contactDataMapper = (entity: CoreEntityResult): ContactType => {
  const { id, meta, attributes, owner, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    surName: meta?.surName!,
    address: meta?.address,
    image: meta?.image,
    email: meta?.email,
    phone: meta?.phone,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
  } as ContactType;
};

export const companyDataMapper = (entity: CoreEntityResult): CompanyType => {
  const { id, meta, attributes, owner, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    address: meta?.address || {} || undefined,
    phone: meta?.phone || undefined,
    email: meta?.email || undefined,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
  } as CompanyType;
};

export const propertyDataMapper = (entity: CoreEntityResult): PropertyType => {
  const { id, meta, attributes, owner, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
  } as PropertyType;
};
