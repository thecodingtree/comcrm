import { PrismaClient } from '@prisma/client';

import { getAuthedServerSession } from '@/server/utils';

import { NoteType, NotesFilterType } from '@/server/sharedTypes';

export async function getNotes({
  db,
  filter,
  limit,
}: {
  db: PrismaClient;
  filter?: NotesFilterType;
  limit?: number;
}) {
  return db.note.findMany({
    where: { OR: [{ ...filter }] },
    include: { creator: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function createNote({
  db,
  entityId,
  content,
}: {
  db: PrismaClient;
  entityId: string;
  content: string;
}) {
  const session = await getAuthedServerSession();

  return db.note.create({
    data: {
      entityId,
      content,
      creatorId: session?.user?.id!,
    },
  });
}
