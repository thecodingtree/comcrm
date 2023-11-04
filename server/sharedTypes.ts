import { z } from 'zod';

export const RESERVED_PREFIX = 'RESERVED_';

export type AttributeType = {
  name: string;
  value: string;
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
  alt_phone?: string;
  email?: string;
  address?: AddressType;
  image?: string;
  attributes: AttributeType[];
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
  name: z.string(),
  value: z.string(),
});

export enum ContactReservedAttributes {
  ALT_PHONE = `${RESERVED_PREFIX}ALT_PHONE`,
}
