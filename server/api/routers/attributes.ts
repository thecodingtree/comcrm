import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

const AttributeCreateUpdateInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
  entityId: z.string().optional(),
});

const AttributeUpdateInput = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export const attributesRouter = createTRPCRouter({
  updateOrCreateAttribute: protectedProcedure
    .input(AttributeCreateUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, name, value, entityId } = input;

      if (id) {
        const attribute = await prisma.attributes.update({
          select: { id: true, name: true, value: true, entityId: true },
          where: { id },
          data: {
            name,
            value,
          },
        });

        return attribute;
      }

      if (!entityId) {
        throw new Error('entityId is required');
      }

      const attribute = await prisma.attributes.create({
        select: { id: true, name: true, value: true, entityId: true },
        data: {
          name,
          value,
          entityId,
        },
      });

      return attribute;
    }),
});
