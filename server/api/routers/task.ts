import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';

import { getTasks } from '@/server/task';

import { taskInput, tasksFilter } from '@/server/sharedTypes';

import { z } from 'zod';

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure
    .input(tasksFilter)
    .query(async ({ ctx, input }) => {
      return await getTasks({
        db: ctx.prisma,
        filter: {
          type: input.type?.length ? input.type : undefined,
          entity: input.entity,
          completed: input.completed,
          endDate: input.endDate,
        },
        limit: input.limit ?? 10,
      });
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
  completeTasks: protectedProcedure
    .input(z.object({ taskIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.updateMany({
        where: {
          id: {
            in: input.taskIds,
          },
        },
        data: {
          completed: true,
        },
      });
    }),
});
