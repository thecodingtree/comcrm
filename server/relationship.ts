import { RelationshipType, Prisma, PrismaClient } from '@prisma/client';

const relationshipInclude = Prisma.validator<Prisma.RelationshipInclude>()({
  from: { include: { meta: true } },
  to: { include: { meta: true } },
});

export type RelationshipResult = Prisma.RelationshipGetPayload<{
  include: typeof relationshipInclude;
}>;

export function getRelationshipsForEntity({
  db,
  entityId,
  limit = 10,
}: {
  db: PrismaClient;
  entityId: string;
  limit?: number;
}): Promise<RelationshipResult[]> {
  return db.relationship.findMany({
    include: relationshipInclude,
    where: { fromEntityId: entityId! },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export function createRelationship({
  db,
  fromEntityId,
  toEntityId,
  type,
}: {
  db: PrismaClient;
  fromEntityId: string;
  toEntityId: string;
  type: RelationshipType;
}) {
  return db.relationship.create({
    data: {
      fromEntityId,
      toEntityId,
      type,
    },
  });
}
