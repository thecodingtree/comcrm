import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import {
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributes,
} from '@/server/attribute';

const AttributeCreateUpdateInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
  custom: z.boolean().optional(),
  entityId: z.string().optional(),
});

export const attributesRouter = createTRPCRouter({
  getAttributes: protectedProcedure
    .input(z.object({ entityId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return getAttributes({ db: prisma, entityId: input.entityId });
    }),
  updateOrCreateAttribute: protectedProcedure
    .input(AttributeCreateUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, name, value, custom, entityId } = input;

      if (id) {
        return updateAttribute({ db: prisma, id, name, value, custom });
      }

      if (!entityId) {
        throw new Error('entityId is required');
      }

      return await createAttribute({
        db: prisma,
        name,
        value,
        custom,
        entityId,
      });
    }),
  deleteAttribute: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return deleteAttribute({ db: prisma, id: input.id });
    }),
});
