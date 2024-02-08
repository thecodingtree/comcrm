import { PrismaClient, TeamRole } from '@prisma/client';
import { getAuthedServerSession } from './utils';

export async function createTeam({
  db,
  name,
  slug,
  linkData = true,
  user,
}: {
  db: PrismaClient;
  name: string;
  slug: string;
  linkData?: boolean;
  user?: string;
}) {
  if (!user) {
    const session = await getAuthedServerSession();
    user = session?.user?.id;
  }

  const team = await db.team.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId: user!,
          role: TeamRole.OWNER,
        },
      },
    },
  });

  if (linkData) {
    // Set all of the users entities to be linked to the new team
    await db.coreEntity.updateMany({
      where: { ownerId: user! },
      data: { teamId: team.id },
    });
  }

  return team;
}

export async function getTeamForUser({
  db,
  user,
}: {
  db: PrismaClient;
  user?: string;
}) {
  if (!user) {
    const session = await getAuthedServerSession();
    user = session?.user?.id;
  }

  return db.team.findFirst({
    where: { members: { some: { userId: user } } },
    include: { members: { include: { user: true } } },
  });
}

export function getTeamUsers({
  db,
  teamId,
}: {
  db: PrismaClient;
  teamId: string;
}) {
  return db.teamUser.findMany({
    where: { teamId },
    include: { user: true },
  });
}

export function addUserToTeam({
  db,
  teamId,
  userId,
  role = TeamRole.MEMBER,
}: {
  db: PrismaClient;
  teamId: string;
  userId: string;
  role?: TeamRole;
}) {
  return db.teamUser.create({
    data: {
      teamId,
      userId,
      role,
    },
  });
}

export function removeUsersFromTeam({
  db,
  teamId,
  userIds,
}: {
  db: PrismaClient;
  teamId: string;
  userIds: string[];
}) {
  return db.teamUser.deleteMany({
    where: { teamId: teamId, userId: { in: userIds } },
  });
}

export function getTeamInvites({
  db,
  filter,
}: {
  db: PrismaClient;
  filter: { team?: string; email?: string };
}) {
  return db.teamInvite.findMany({
    include: { team: true },
    where: { OR: [{ teamId: filter.team }, { email: filter.email }] },
  });
}

export function getTeamInvite({
  db,
  id,
  filter,
}: {
  db: PrismaClient;
  id?: number;
  filter?: { teamSlug?: string; token?: string; email?: string };
}) {
  // If an id is provided, use it to find the invite
  if (id) {
    return db.teamInvite.findUnique({
      where: { id },
      include: { team: true },
    });
  }

  // If a filter is provided, use it to find the invite
  return db.teamInvite.findUnique({
    where: {
      team: { slug: filter?.teamSlug },
      token: filter?.token,
      email: filter?.email,
    },
    include: { team: true },
  });
}

export function createTeamInvite({
  db,
  teamId,
  email,
  role = TeamRole.MEMBER,
}: {
  db: PrismaClient;
  teamId: string;
  email: string;
  role?: TeamRole;
}) {
  return db.teamInvite.create({
    include: { team: true },
    data: {
      teamId,
      email,
      role,
    },
  });
}

export function deleteTeamInvite({ db, id }: { db: PrismaClient; id: number }) {
  return db.teamInvite.delete({
    where: { id },
  });
}

// export function createNote({
//   db,
//   entityId,
//   content,
// }: {
//   db: PrismaClient;
//   entityId: string;
//   content: string;
// }) {
//   return db.note.create({
//     data: {
//       entityId,
//       content,
//     },
//   });
// }
