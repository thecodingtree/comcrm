import {
  CoreEntityType,
  Prisma,
  PrismaClient,
  RelationshipCategory,
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
  Prisma.validator<Prisma.RelationshipTypeInclude>()({ relationship: true });

export type RelationshipTypeResult = Prisma.RelationshipTypeGetPayload<{
  include: typeof relationshipTypeInclude;
}>;

const twoWayWhereLookUp = (from?: CoreEntityType[], to?: CoreEntityType[]) => ({
  direction: RelationshipDirection.TWO_WAY,
  OR: [
    { from: { in: from }, to: { in: to } },
    { from: { in: to }, to: { in: from } },
  ],
});

const oneWayWhereLookUp = (from?: CoreEntityType[], to?: CoreEntityType[]) => ({
  direction: RelationshipDirection.ONE_WAY,
  AND: [
    { from: { in: from } },
    {
      to: { in: to },
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
  const filters = [];

  if (filter?.entity && filter?.entity?.length > 0) {
    filters.push({
      OR: [{ from: { in: filter.entity } }, { to: { in: filter.entity } }],
    });
  }

  if (filter?.name) {
    filters.push({ name: { contains: filter.name } });
  }

  if (filter?.category && filter.category.length > 0) {
    filters.push({ category: { in: filter.category } });
  }

  return db.relationshipType.findMany({
    where: {
      AND: filters,
    },
    include: relationshipTypeInclude,
  });
}

export function createRelationshipType({
  db,
  creator,
  name,
  from,
  to,
  category,
  direction,
}: {
  db: PrismaClient;
  creator: string;
  name: string;
  from: CoreEntityType;
  to: CoreEntityType;
  category: RelationshipCategory;
  direction?: RelationshipDirection;
}) {
  return db.relationshipType.create({
    data: {
      creatorId: creator,
      name,
      from,
      to,
      category,
      direction,
    },
  });
}

export function updateRelationshipType({
  db,
  id,
  name,
  from,
  to,
  category,
  direction,
}: {
  db: PrismaClient;
  id: string;
  name: string;
  from: CoreEntityType;
  to: CoreEntityType;
  category: RelationshipCategory;
  direction?: RelationshipDirection;
}) {
  return db.relationshipType.update({
    where: { id },
    data: {
      name,
      from,
      to,
      category,
      direction,
    },
  });
}

export function deleteRelationshipType({
  db,
  id,
}: {
  db: PrismaClient;
  id: string;
}) {
  return db.relationshipType.delete({
    where: { id },
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
