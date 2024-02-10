import { Prisma, CoreEntityType } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { TRPCError } from '@trpc/server';

import {
  EntityFilterInput,
  CreateCompanyInput,
  UpdateCompanyInput,
} from '@/server/sharedTypes';

import {
  getCoreEntities,
  getCoreEntity,
  CoreEntityResult,
  deleteCoreEntity,
  updateCoreEntity,
} from '@/server/coreEntities';
import { companyDataMapper } from '@/server/api/mappers';
import { companyCreator } from '@/server/api/creators';

export const companyRouter = createTRPCRouter({
  getCompanies: protectedProcedure
    .input(z.object({ filter: EntityFilterInput }).optional())
    .query(async ({ ctx, input }) => {
      const result = await getCoreEntities({
        db: ctx.prisma,
        entityType: CoreEntityType.COMPANY,
        filter: input?.filter,
      });

      const results = result.map((entity: CoreEntityResult) => {
        return companyDataMapper(entity, ctx.session?.user);
      });
      return results;
    }),
  getCompany: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }

      const result = await getCoreEntity({ db: ctx.prisma, id: input });

      return result ? companyDataMapper(result, ctx.session?.user) : null;
    }),
  createCompany: protectedProcedure
    .input(CreateCompanyInput)
    .mutation(({ ctx, input }) => {
      return companyCreator({
        db: ctx.prisma,
        data: input,
        user: ctx.session.user,
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

      return companyDataMapper(result, ctx.session?.user);
    }),
  deleteCompany: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await deleteCoreEntity({
        db: ctx.prisma,
        id: input,
      });

      if (!result) {
        throw new Error(`CoreEntity with ID ${input} not found`);
      }

      return companyDataMapper(result, ctx.session?.user);
    }),
});
