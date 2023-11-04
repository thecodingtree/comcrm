import { z } from 'zod';

export const CONTACT_RESERVED_PREFIX = 'CONTACT_RESERVED_';
export const PROPERTY_RESERVED_PREFIX = 'PROPERTY_RESERVED_';
export const COMPANY_RESERVED_PREFIX = 'COMPANY_RESERVED_';

export type AttributeType = {
  id?: string;
  name: string;
  value: string;
  entityId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddressType = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type ContactType = {
  id: string;
  name: string;
  surName: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  image?: string;
  attributes: AttributeType[];
  user?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyType = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  attributes: AttributeType[];
  image?: string;
  user?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyType = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  attributes: AttributeType[];
  image?: string;
  user?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AddressInput = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

export const AttributeInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
});

export const EntityFilterInput = z.object({
  id: z.string().optional(),
});

export type EntityFilterType = z.infer<typeof EntityFilterInput>;

export enum ContactReservedAttributes {
  ALT_PHONE = `${CONTACT_RESERVED_PREFIX}ALT_PHONE`,
}

export enum PropertyReservedAttributes {
  SUITE = `${PROPERTY_RESERVED_PREFIX}SUITE`,
  SIZE = `${PROPERTY_RESERVED_PREFIX}SIZE`,
  PRICE = `${PROPERTY_RESERVED_PREFIX}PRICE`,
}

export enum CompanyReservedAttributes {
  WEBSITE = `${COMPANY_RESERVED_PREFIX}WEBSITE`,
  SIZE = `${COMPANY_RESERVED_PREFIX}SIZE`,
  ALT_PHONE = `${COMPANY_RESERVED_PREFIX}ALT_PHONE`,
  ALT_EMAIL = `${COMPANY_RESERVED_PREFIX}ALT_EMAIL`,
}
