import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { createAttribute, updateAttribute } from '@/server/attribute';

const AttributeCreateUpdateInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
  entityId: z.string().optional(),
});

export const attributesRouter = createTRPCRouter({
  updateOrCreateAttribute: protectedProcedure
    .input(AttributeCreateUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, name, value, entityId } = input;

      if (id) {
        return updateAttribute({ db: prisma, id, name, value });
      }

      if (!entityId) {
        throw new Error('entityId is required');
      }

      return await createAttribute({ db: prisma, name, value, entityId });
    }),
});
