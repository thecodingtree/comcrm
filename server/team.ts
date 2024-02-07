import { PrismaClient } from '@prisma/client';

export function getTeam({ db }: { db: PrismaClient }) {
  return db.team.findFirst({
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
