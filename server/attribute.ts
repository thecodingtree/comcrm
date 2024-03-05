import { PrismaClient } from '@prisma/client';
import { AttributeFilterType } from './sharedTypes';

export function getAttributes({
  db,
  filter,
}: {
  db: PrismaClient;
  filter: AttributeFilterType;
}) {
  return db.attributes.findMany({
    where: { entityId: { in: filter?.entityId }, custom: filter?.custom },
    orderBy: { createdAt: 'asc' },
  });
}

export function updateAttribute({
  db,
  id,
  name,
  value,
  custom = false,
}: {
  db: PrismaClient;
  id: string;
  name: string;
  value: string;
  custom?: boolean;
}) {
  return db.attributes.update({
    select: { id: true, name: true, value: true, entityId: true },
    where: { id },
    data: {
      name,
      value,
      custom,
    },
  });
}

export function createAttribute({
  db,
  name,
  value,
  custom = false,
  entityId,
}: {
  db: PrismaClient;
  name: string;
  value: string;
  custom?: boolean;
  entityId: string;
}) {
  return db.attributes.create({
    select: { id: true, name: true, value: true, entityId: true },
    data: {
      name,
      value,
      entityId,
      custom,
    },
  });
}

export function deleteAttribute({ db, id }: { db: PrismaClient; id: string }) {
  return db.attributes.delete({
    where: { id },
  });
}
