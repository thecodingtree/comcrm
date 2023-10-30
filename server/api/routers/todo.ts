import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
} from '@/server/api/trpc';
import { z } from 'zod';

let todos = [
  {
    id: 1,
    title: 'Hello',
    description: 'World',
  },
];

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async () => {
    return todos;
  }),
  addTodo: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = {
        id: todos.length + 1,
        title: input.title,
        description: input.description,
      };
      todos.push(todo);
      return todo;
    }),
  getTodosAuthed: protectedProcedure.query(({ ctx }) => {
    return todos;
  }),
});
