import { CoreEntityResult } from '../db';
import { Contact, Company, Property } from '../generated/resolvers-types';

export const contactDataMapper = (entity: CoreEntityResult): Contact => {
  const { id, meta, attributes, user, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    surName: meta?.surName,
    address: meta?.address,
    image: meta?.image,
    email: meta?.email,
    phone: meta?.phone,
    attributes,
    user,
    createdAt,
    updatedAt,
  } as Contact;
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
