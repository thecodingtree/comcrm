import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getNotes, createNote } from '@/server/note';
import { NotesFilterInput } from '@/server/sharedTypes';

export const notesRouter = createTRPCRouter({
  getNotes: protectedProcedure
    .input(
      z.object({
        filter: NotesFilterInput.optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await getNotes({
        db: ctx.prisma,
        filter: input.filter,
        limit: input.limit,
      });
    }),
  getNotesForMe: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getNotes({
        db: ctx.prisma,
        filter: { creatorId: ctx.session?.user?.id },
        limit: input.limit ?? 10,
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
