import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  EntityFilterInput,
  CreateContactInput,
  UpdateContactInput,
} from '@/server/sharedTypes';
import { contactCreator } from '@/server/api/creators';

import {
  getCoreEntities,
  getCoreEntity,
  updateCoreEntity,
  deleteCoreEntity,
  CoreEntityResult,
} from '@/server/coreEntities';
import { contactDataMapper } from '@/server/api/mappers';

export const contactRouter = createTRPCRouter({
  getContacts: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getCoreEntities({
        db: ctx.prisma,
        filter: { type: [CoreEntityType.CONTACT], ...input?.filter },
      });

      const results = result.map((entity: CoreEntityResult) => {
        return contactDataMapper(entity, ctx.session?.user);
      });

      return results;
    }),
  getContact: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      const result = await getCoreEntity({ db: ctx.prisma, id: input });

      return result ? contactDataMapper(result, ctx.session?.user) : null;
    }),
  createContact: protectedProcedure
    .input(CreateContactInput)
    .mutation(({ ctx, input }) =>
      contactCreator({
        db: ctx.prisma,
        data: input,
        user: ctx.session.user,
      }),
    ),
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

      return contactDataMapper(result, ctx.session?.user);
    }),
  deleteContact: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity({
        db: ctx.prisma,
        id: input,
      });

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return contactDataMapper(result, ctx.session?.user);
    }),
  updateAvatarSrc: protectedProcedure
    .input(z.object({ id: z.string(), avatarSrc: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const coreEntityUpdateInput = {
        meta: {
          update: {
            image: input.avatarSrc,
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

      return contactDataMapper(result, ctx.session?.user);
    }),
});
