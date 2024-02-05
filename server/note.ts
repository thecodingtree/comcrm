import { PrismaClient } from '@prisma/client';

import { NoteType, NotesFilterType } from '@/server/sharedTypes';

export function getNotes({
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
    orderBy: { createdAt: 'desc' },
    take: limit,
  }) as Promise<NoteType[]>;
}

export function createNote({
  db,
  entityId,
  content,
}: {
  db: PrismaClient;
  entityId: string;
  content: string;
}) {
  return db.note.create({
    data: {
      entityId,
      content,
    },
  });
}
