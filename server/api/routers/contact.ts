import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AddressInput, AttributeInput } from '@/server/sharedTypes';
import { contactCreator } from '@/server/api/creators';

const CreateContactInput = z.object({
  name: z.string(),
  surName: z.string(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateContactInputType = z.infer<typeof CreateContactInput>;

export const contactRouter = createTRPCRouter({
  createContact: protectedProcedure
    .input(CreateContactInput)
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a contact',
        });
      }

      return contactCreator({
        data: input,
        user: ctx.session.user.id,
      });
    }),
});
