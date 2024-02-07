import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import { getTeam, getTeamUsers } from '@/server/team';
import { TeamUser } from '@/server/sharedTypes';
import { Team } from '@prisma/client';

export const teamRouter = createTRPCRouter({
  getTeam: protectedProcedure.query(async ({ ctx }) => {
    const team = await getTeam({
      db: ctx.prisma,
    });

    return team
      ? ({
          ...team,
          members: team.members.map((member) => {
            return {
              id: member.user.id,
              name: member.user.name,
              email: member.user.email,
              image: member.user.image,
              role: member.role,
            } as TeamUser;
          }),
        } as Team)
      : null;
  }),
  getTeamUsers: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teamUsers = await getTeamUsers({
        db: ctx.prisma,
        teamId: input.teamId,
      });

      return teamUsers.map((teamUser) => {
        return {
          id: teamUser.user.id,
          name: teamUser.user.name,
          email: teamUser.user.email,
          image: teamUser.user.image,
          role: teamUser.role,
        } as TeamUser;
      });
    }),
});
