import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

export const notesRouter = createTRPCRouter({
  getNotesForEntity: protectedProcedure
    .input(z.object({ entityId: z.string(), limit: z.number().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: { entityId: input.entityId },
        orderBy: { createdAt: 'desc' },
        take: input?.limit ?? 10,
      });
    }),
  createNote: protectedProcedure
    .input(z.object({ entityId: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          entityId: input.entityId,
          content: input.content,
        },
      });
    }),
});
