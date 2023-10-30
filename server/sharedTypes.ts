import { z } from 'zod';

export const AddressInput = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const AttributeInput = z.object({
  name: z.string(),
  value: z.string(),
});
