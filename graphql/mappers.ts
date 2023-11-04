import * as R from 'ramda';
import { ContactReservedAttributes } from '@/server/sharedTypes';
import { CoreEntityResult } from '../db';
import { Company, Property } from '../generated/resolvers-types';
import { RESERVED_PREFIX } from '@/server/sharedTypes';

import { ContactType } from '@/server/sharedTypes';

const isNotReservedAttribute = (attribute: any) => {
  return !R.startsWith(RESERVED_PREFIX, attribute.name);
};

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

export const companyDataMapper = (entity: CoreEntityResult): Company => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    user,
    createdAt,
    updatedAt,
  } as Company;
};

export const propertyDataMapper = (entity: CoreEntityResult): Property => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    user,
    createdAt,
    updatedAt,
  } as Property;
};
