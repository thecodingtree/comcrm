import { PrismaClient } from '@prisma/client';

export function updateAttribute({
  db,
  id,
  name,
  value,
}: {
  db: PrismaClient;
  id: string;
  name: string;
  value: string;
}) {
  return db.attributes.update({
    select: { id: true, name: true, value: true, entityId: true },
    where: { id },
    data: {
      name,
      value,
    },
  });
}

export function createAttribute({
  db,
  name,
  value,
  entityId,
}: {
  db: PrismaClient;
  name: string;
  value: string;
  entityId: string;
}) {
  return db.attributes.create({
    select: { id: true, name: true, value: true, entityId: true },
    data: {
      name,
      value,
      entityId,
    },
  });
}
