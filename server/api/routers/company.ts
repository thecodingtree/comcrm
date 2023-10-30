import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AddressInput, AttributeInput } from '@/server/sharedTypes';
import { companyCreator } from '@/server/api/creators';

const CreateCompanyInput = z.object({
  name: z.string(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateCompanyInputType = z.infer<typeof CreateCompanyInput>;

export const companyRouter = createTRPCRouter({
  createCompany: protectedProcedure
    .input(CreateCompanyInput)
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a contact',
        });
      }

      return companyCreator({
        data: input,
        user: ctx.session.user.id,
      });
    }),
});
