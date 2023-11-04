import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  AddressInput,
  AttributeInput,
  EntityFilterInput,
} from '@/server/sharedTypes';
import { propertyCreator } from '@/server/api/creators';

import {
  getOwnedCoreEntities,
  getOwnedCoreEntity,
  CoreEntityResult,
  deleteCoreEntity,
  updateCoreEntity,
} from '@/db';
import { propertyDataMapper } from '@/server/api/mappers';

const CreatePropertyInput = z.object({
  name: z.string(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreatePropertyInputType = z.infer<typeof CreatePropertyInput>;

const UpdatePropertyInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdatePropertyInputType = z.infer<typeof UpdatePropertyInput>;

export const propertyRouter = createTRPCRouter({
  getProperties: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getOwnedCoreEntities({
        entityType: CoreEntityType.PROPERTY,
        filter: input?.filter,
        withUserId: ctx.session.user.id,
      });

      const results = result.map((entity: CoreEntityResult) => {
        return propertyDataMapper(entity);
      });

      return results;
    }),
  getProperty: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      if (!ctx.session.user.id) {
        return null;
      }

      const result = await getOwnedCoreEntity(input, ctx?.session?.user?.id);

      return result ? propertyDataMapper(result) : null;
    }),
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
  updateProperty: protectedProcedure
    .input(UpdatePropertyInput)
    .mutation(async ({ ctx, input }) => {
      const coreEntityUpdateInput = {
        meta: {
          update: {
            name: input.name,
            phone: input.phone,
            email: input.email,
            address: input?.address
              ? {
                  create: input.address,
                }
              : undefined,
          },
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

      return propertyDataMapper(result);
    }),
  deleteProperty: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity(input, ctx.session.user?.id!!);

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return propertyDataMapper(result);
    }),
});
