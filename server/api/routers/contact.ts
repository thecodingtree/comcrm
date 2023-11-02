import { Prisma, CoreEntityType } from '@prisma/client';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AddressInput, AttributeInput } from '@/server/sharedTypes';
import { contactCreator } from '@/server/api/creators';

import { getOwnedCoreEntity, updateCoreEntity } from '@/db';
import { contactDataMapper } from '@/graphql/mappers';
import { coreEntityUpdater } from '@/graphql/resolvers';

const CreateContactInput = z.object({
  name: z.string(),
  surName: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateContactInputType = z.infer<typeof CreateContactInput>;

const UpdateContactInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  surName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdateContactInputType = z.infer<typeof UpdateContactInput>;

export const contactRouter = createTRPCRouter({
  getContact: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      if (!ctx.session.user.id) {
        return null;
      }

      const result = await getOwnedCoreEntity(input, ctx?.session?.user?.id);

      return result ? contactDataMapper(result) : null;
    }),
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
  updateContact: protectedProcedure
    .input(UpdateContactInput)
    .mutation(async ({ ctx, input }) => {
      const coreEntityUpdateInput = {
        meta: {
          update: {
            name: input.name,
            surName: input.surName,
            phone: input.phone,
            email: input.email,
            address: input?.address
              ? {
                  create: input.address,
                }
              : undefined,
          },
        },
        attributes: {
          create: input.attributes,
        },
      } as Prisma.CoreEntityUpdateInput;

      const result = await updateCoreEntity(
        input.id,
        ctx.session.user?.id || '',
        coreEntityUpdateInput
      );

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `CoreEntity with ID ${input.id} not found`,
        });
      }

      return contactDataMapper(result);
    }),
});
