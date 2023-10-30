import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AddressInput, AttributeInput } from '@/server/sharedTypes';
import { propertyCreator } from '@/server/api/creators';

const CreatePropertyInput = z.object({
  name: z.string(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreatePropertyInputType = z.infer<typeof CreatePropertyInput>;

export const propertyRouter = createTRPCRouter({
  createProperty: protectedProcedure
    .input(CreatePropertyInput)
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a contact',
        });
      }

      return propertyCreator({
        data: input,
        user: ctx.session.user.id,
      });
    }),
});
