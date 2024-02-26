import { Prisma, PrismaClient } from '@prisma/client';

import { getAuthedServerSession } from '@/server/utils';

import { NotesFilterType } from '@/server/sharedTypes';

const notesInclude = Prisma.validator<Prisma.NoteInclude>()({
  creator: true,
  entity: { include: { meta: true } },
});

export type NoteResult = Prisma.NoteGetPayload<{
  include: typeof notesInclude;
}>;

export async function getNotes({
  db,
  filter,
  limit,
}: {
  db: PrismaClient;
  filter?: NotesFilterType;
  limit?: number;
}): Promise<NoteResult[]> {
  return db.note.findMany({
    where: { OR: filter ? [{ ...filter }] : undefined },
    include: notesInclude,
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
