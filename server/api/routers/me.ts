import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getMe, updateMe } from '@/server/me';

export const meRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return getMe({ db: ctx.prisma, user: ctx.session?.user?.id! });
  }),
  updateMe: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await updateMe({
        db: ctx.prisma,
        name: input.name,
        image: input.image,
        user: ctx.session?.user?.id!,
      });

      return user;
    }),
});
