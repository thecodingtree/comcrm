import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { z } from 'zod';

import {
  createTeam,
  getTeamUser,
  getTeamUsers,
  getTeamInvites,
  createTeamInvite,
  deleteTeamInvite,
  addUserToTeam,
  getTeamInvite,
  removeUsersFromTeam,
} from '@/server/team';
import { TeamUser, TeamInvite } from '@/server/sharedTypes';
import { Team, TeamRole } from '@prisma/client';

import { sendTeamInvite } from '@/emails/send-team-invite';

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        linkData: z.boolean().optional().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await createTeam({
        db: ctx.prisma,
        name: input.name,
        slug: input.slug,
        linkData: input.linkData,
        user: ctx.session?.user?.id!,
      });

      return {
        id: team.id,
        name: team.name,
        slug: team.slug,
      } as Team;
    }),
  getTeamUser: protectedProcedure.query(async ({ ctx }) => {
    return getTeamUser({
      db: ctx.prisma,
      user: ctx.session?.user?.id!,
    });
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
  getTeamInvites: protectedProcedure
    .input(
      z.object({
        team: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teamInvites = await getTeamInvites({
        db: ctx.prisma,
        filter: { team: input.team, email: input.email },
      });

      return teamInvites.map((invite) => {
        return {
          id: invite.id,
          team: {
            name: invite.team.name,
            slug: invite.team.slug,
          },
          token: invite.token,
          email: invite.email,
          role: invite.role,
          status: 'PENDING',
        } as TeamInvite;
      });
    }),
  inviteMember: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        email: z.string().email(),
        role: z
          .enum([TeamRole.MEMBER, TeamRole.ADMIN, TeamRole.OWNER])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createTeamInvite({
        teamId: input.teamId,
        email: input.email,
        role: input.role,
        db: ctx.prisma,
      });

      const invite = {
        id: result.id,
        team: {
          id: result.teamId,
          name: result.team.name,
          slug: result.team.slug,
        },
        token: result.token,
        email: result.email,
        role: result.role,
        status: 'PENDING',
      } as TeamInvite;

      // Send email to user with invite link
      sendTeamInvite(invite, ctx.session?.user?.email!).catch((err: any) => {
        console.error('Error sending team invite email:', err);
      });

      return invite;
    }),
  acceptInvite: protectedProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const invite = await ctx.prisma.teamInvite.findUnique({
        where: { token: input.token },
      });

      if (!invite) {
        throw new Error('Invalid invite token');
      }

      if (invite.email !== ctx.session?.user?.email) {
        throw new Error('Invalid invite token');
      }

      await addUserToTeam({
        db: ctx.prisma,
        teamId: invite.teamId,
        userId: ctx.session?.user?.id!,
        role: invite.role,
      });

      await deleteTeamInvite({ db: ctx.prisma, id: invite.id });

      return true;
    }),
  deleteInvite: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await deleteTeamInvite({ db: ctx.prisma, id: input.id });

      return true;
    }),

  resendInvite: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const invite = await getTeamInvite({ db: ctx.prisma, id: input.id });

      if (!invite) {
        throw new Error('Invalid invite id');
      }

      const inviteData = {
        id: invite.id,
        team: {
          id: invite.teamId,
          name: invite.team.name,
          slug: invite.team.slug,
        },
        token: invite.token,
        email: invite.email,
        role: invite.role,
        status: 'PENDING',
      } as TeamInvite;

      // Send email to user with invite link
      sendTeamInvite(inviteData, ctx.session?.user?.email!).catch(
        (err: any) => {
          console.error('Error sending team invite email:', err);
        },
      );

      return true;
    }),
  isTeamSlugAvailable: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.findUnique({
        where: { slug: input.slug },
      });

      return { available: !team };
    }),
  removeTeamUsers: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return removeUsersFromTeam({
        db: ctx.prisma,
        teamId: input.teamId,
        userIds: input.userIds,
      });
    }),
  leaveTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return removeUsersFromTeam({
        db: ctx.prisma,
        teamId: input.teamId,
        userIds: [ctx.session?.user?.id!],
      });
    }),
});
