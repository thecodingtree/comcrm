import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

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
  getNotesForEntity: protectedProcedure.query(() => {
    return notes;
  }),
});
