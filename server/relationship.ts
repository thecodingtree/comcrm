import {
  CoreEntityType,
  Prisma,
  PrismaClient,
  RelationshipDirection,
} from '@prisma/client';

import { RelationshipTypeFilter } from './sharedTypes';

const relationshipInclude = Prisma.validator<Prisma.RelationshipInclude>()({
  from: { include: { meta: true } },
  to: { include: { meta: true } },
  type: true,
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

const relationshipTypeInclude =
  Prisma.validator<Prisma.RelationshipTypeInclude>()({});

export type RelationshipTypeResult = Prisma.RelationshipTypeGetPayload<{
  include: typeof relationshipTypeInclude;
}>;

const twoWayWhereLookUp = (from?: CoreEntityType, to?: CoreEntityType) => ({
  direction: RelationshipDirection.TWO_WAY,
  OR: [
    { from: from, to: to },
    { from: to, to: from },
  ],
});

const oneWayWhereLookUp = (from?: CoreEntityType, to?: CoreEntityType) => ({
  direction: RelationshipDirection.ONE_WAY,
  AND: [
    { from: from },
    {
      to: to,
    },
  ],
});

export function getRelationshipTypes({
  db,
  filter,
}: {
  db: PrismaClient;
  filter?: RelationshipTypeFilter;
}) {
  return db.relationshipType.findMany({
    where: {
      OR: [
        twoWayWhereLookUp(filter?.from, filter?.to),
        oneWayWhereLookUp(filter?.from, filter?.to),
        { name: { contains: filter?.name } },
      ],
    },
    include: relationshipTypeInclude,
  });
}

export function createRelationship({
  db,
  fromEntityId,
  toEntityId,
  typeId,
}: {
  db: PrismaClient;
  fromEntityId: string;
  toEntityId: string;
  typeId: string;
}) {
  return db.relationship.create({
    data: {
      fromEntityId,
      toEntityId,
      typeId,
    },
  });
}
