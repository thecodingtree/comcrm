import { z } from 'zod';

const RESERVED_PREFIX = 'RESERVED_';

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
