import { z } from 'zod';

export const RESERVED_PREFIX = 'RESERVED_';

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
  ALT_PHONE = `${RESERVED_PREFIX}ALT_PHONE`,
}

export enum PropertyReservedAttributes {
  SUITE = `${RESERVED_PREFIX}SUITE`,
  SIZE = `${RESERVED_PREFIX}SIZE`,
  PRICE = `${RESERVED_PREFIX}PRICE`,
}
