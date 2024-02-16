import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { getTasks } from '@/server/task';

import { taskInput, tasksFilter } from '@/server/sharedTypes';

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure
    .input(tasksFilter)
    .query(async ({ ctx, input }) => {
      const numResults = input.limit ?? 10;
      const results = await getTasks({
        db: ctx.prisma,
        filter: {
          type: input.type?.length ? input.type : undefined,
          entity: input.entity,
          completed: input.completed,
          endDate: input.endDate,
        },
      });

      return results.slice(0, numResults);
    }),
  createTask: protectedProcedure
    .input(taskInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          creatorId: ctx.session?.user.id!,
          type: input.type,
          description: input.description,
          content: input.content,
          entityId: input.entity,
          priority: input.priority,
          private: input.isPrivate,
          completed: input.completed,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
});
