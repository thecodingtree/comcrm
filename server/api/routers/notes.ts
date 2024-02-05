import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getNotes, createNote } from '@/server/note';

export const notesRouter = createTRPCRouter({
  getNotesForEntity: protectedProcedure
    .input(z.object({ entityId: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getNotes({
        db: ctx.prisma,
        filter: { entityId: input.entityId },
        limit: input.limit,
      });
    }),
  createNote: protectedProcedure
    .input(z.object({ entityId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await createNote({
        db: ctx.prisma,
        entityId: input.entityId,
        content: input.content,
      });
    }),
});
