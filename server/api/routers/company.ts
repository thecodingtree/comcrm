import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  AddressInput,
  AttributeInput,
  EntityFilterInput,
} from '@/server/sharedTypes';

import {
  getOwnedCoreEntities,
  getOwnedCoreEntity,
  CoreEntityResult,
  deleteCoreEntity,
  updateCoreEntity,
} from '@/db';
import { companyDataMapper } from '@/server/api/mappers';
import { companyCreator } from '@/server/api/creators';

const CreateCompanyInput = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateCompanyInputType = z.infer<typeof CreateCompanyInput>;

const UpdateCompanyInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdateCompanyInputType = z.infer<typeof UpdateCompanyInput>;

export const companyRouter = createTRPCRouter({
  getCompanies: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getOwnedCoreEntities({
        entityType: CoreEntityType.COMPANY,
        filter: input?.filter,
        withUserId: ctx.session.user.id,
      });

      const results = result.map((entity: CoreEntityResult) => {
        return companyDataMapper(entity);
      });

      return results;
    }),
  getCompany: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      if (!ctx.session.user.id) {
        return null;
      }

      const result = await getOwnedCoreEntity(input, ctx?.session?.user?.id);

      return result ? companyDataMapper(result) : null;
    }),
  createCompany: protectedProcedure
    .input(CreateCompanyInput)
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a company',
        });
      }

      return companyCreator({
        data: input,
        user: ctx.session.user.id,
      });
    }),
  updateCompany: protectedProcedure
    .input(UpdateCompanyInput)
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

      return companyDataMapper(result);
    }),
  deleteCompany: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity(input, ctx.session.user?.id!!);

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return companyDataMapper(result);
    }),
});
