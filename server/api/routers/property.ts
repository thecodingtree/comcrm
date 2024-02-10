import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  EntityFilterInput,
  CreatePropertyInput,
  UpdatePropertyInput,
} from '@/server/sharedTypes';
import { propertyCreator } from '@/server/api/creators';

import {
  getCoreEntities,
  getCoreEntity,
  CoreEntityResult,
  deleteCoreEntity,
  updateCoreEntity,
} from '@/server/coreEntities';
import { propertyDataMapper } from '@/server/api/mappers';

export const propertyRouter = createTRPCRouter({
  getProperties: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getCoreEntities({
        db: ctx.prisma,
        entityType: CoreEntityType.PROPERTY,
        filter: input?.filter,
      });

      const results = result.map((entity: CoreEntityResult) => {
        return propertyDataMapper(entity, ctx.session?.user);
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

      const result = await getCoreEntity({ db: ctx.prisma, id: input });

      return result ? propertyDataMapper(result, ctx.session?.user) : null;
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
        db: ctx.prisma,
        data: input,
        user: ctx.session.user,
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

      const result = await updateCoreEntity({
        db: ctx.prisma,
        id: input.id,
        data: coreEntityUpdateInput,
      });

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `CoreEntity with ID ${input.id} not found`,
        });
      }

      return propertyDataMapper(result, ctx.session?.user);
    }),
  deleteProperty: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity({
        db: ctx.prisma,
        id: input,
      });

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return propertyDataMapper(result, ctx.session?.user);
    }),
});
