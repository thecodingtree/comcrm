import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  AddressInput,
  AttributeInput,
  EntityFilterInput,
} from '@/server/sharedTypes';
import { contactCreator } from '@/server/api/creators';

import {
  getOwnedCoreEntities,
  getOwnedCoreEntity,
  updateCoreEntity,
  deleteCoreEntity,
  CoreEntityResult,
} from '@/server/db';
import { contactDataMapper } from '@/server/api/mappers';

const CreateContactInput = z.object({
  name: z.string(),
  surName: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
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
  getContacts: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getOwnedCoreEntities({
        db: ctx.prisma,
        entityType: CoreEntityType.CONTACT,
        filter: input?.filter,
        withUserId: ctx.session.user.id,
      });

      const results = result.map((entity: CoreEntityResult) => {
        return contactDataMapper(entity);
      });

      return results;
    }),
  getContact: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      if (!ctx.session.user.id) {
        return null;
      }

      const result = await getOwnedCoreEntity(
        ctx.prisma,
        input,
        ctx?.session?.user?.id,
      );

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
        db: ctx.prisma,
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
      } as Prisma.CoreEntityUpdateInput;

      const result = await updateCoreEntity(
        ctx.prisma,
        input.id,
        ctx.session.user?.id || '',
        coreEntityUpdateInput,
      );

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `CoreEntity with ID ${input.id} not found`,
        });
      }

      return contactDataMapper(result);
    }),
  deleteContact: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity(
        ctx.prisma,
        input,
        ctx.session.user?.id!!,
      );

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return contactDataMapper(result);
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

      const result = await updateCoreEntity(
        ctx.prisma,
        input.id,
        ctx.session.user?.id || '',
        coreEntityUpdateInput,
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
