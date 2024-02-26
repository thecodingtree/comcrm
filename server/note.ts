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
  const filters = [];

  if (filter?.creator) {
    filters.push({ creatorId: filter.creator });
  }

  if (filter?.entity) {
    if (filter.entity.id && filter.entity.id.length > 0) {
      filters.push({ entityId: { in: filter.entity.id ?? [] } });
    }

    if (filter.entity.type && filter.entity.type.length > 0) {
      filters.push({ entity: { type: { in: filter.entity.type } } });
    }
  }

  return db.note.findMany({
    where: { AND: filters },
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
