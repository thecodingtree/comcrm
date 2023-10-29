import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getNoteForEntity } from '@/db';

let notes = [
  {
    id: 3,
    content: 'This is a test note that has something in it',
    createdAt: new Date().setDate(new Date().getDate() - 1),
    updatedAt: new Date(),
  },
  {
    id: 2,
    content: 'This is another note about something',
    createdAt: new Date().setDate(new Date().getDate() - 3),
    updatedAt: new Date(),
  },
  {
    id: 1,
    content: 'I agree with the note I put in yesterday',
    createdAt: new Date().setDate(new Date().getDate() - 2),
    updatedAt: new Date(),
  },
];

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
