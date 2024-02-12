import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getTasksForUser } from '@/server/task';

export const taskRouter = createTRPCRouter({
  getTasksForUser: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        limit: z.number().optional().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const results = await getTasksForUser({
        db: ctx.prisma,
        filter: { category: input.category },
      });

      return results.slice(0, input.limit);
    }),
});
