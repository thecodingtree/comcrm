import {
  CoreEntityType,
  Prisma,
  PrismaClient,
  RelationshipCategory,
  RelationshipDirection,
} from '@prisma/client';

import { RelationshipFilter, RelationshipTypeFilter } from './sharedTypes';

const relationshipInclude = Prisma.validator<Prisma.RelationshipInclude>()({
  from: { include: { meta: true } },
  to: { include: { meta: true } },
  type: true,
});

export type RelationshipResult = Prisma.RelationshipGetPayload<{
  include: typeof relationshipInclude;
}>;

const buildRelationshipFilter = (filter: RelationshipFilter) => {
  const filters = [];

  if (filter?.from) {
    if (filter.from?.id?.length) {
      filters.push({ from: { id: { in: filter.from?.id } } });
    }

    if (filter.from?.type?.length) {
      filters.push({ from: { type: { in: filter.from?.type } } });
    }
  }

  if (filter?.to) {
    if (filter.to?.id?.length) {
      filters.push({ to: { id: { in: filter.to?.id } } });
    }

    if (filter?.to && filter.to?.type?.length) {
      filters.push({ to: { type: { in: filter.to?.type } } });
    }
  }

  if (filter?.type) {
    if (filter.type?.id?.length) {
      filters.push({ typeId: { in: filter.type?.id } });
    }

    if (filter.type?.search) {
      filters.push({ type: { name: { search: filter.type?.search } } });
    }

    if (filter.type?.direction?.length) {
      filters.push({ type: { direction: { in: filter.type?.direction } } });
    }

    if (filter.type?.category?.length) {
      filters.push({ type: { category: { in: filter.type?.category } } });
    }
  }

  return filters;
};

export function getRelationships({
  db,
  filter,
  limit = 10,
}: {
  db: PrismaClient;
  filter: RelationshipFilter;
  limit?: number;
}): Promise<RelationshipResult[]> {
  return db.relationship.findMany({
    include: relationshipInclude,
    where: { AND: buildRelationshipFilter(filter) },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

const relationshipTypeInclude =
  Prisma.validator<Prisma.RelationshipTypeInclude>()({ relationship: true });

export type RelationshipTypeResult = Prisma.RelationshipTypeGetPayload<{
  include: typeof relationshipTypeInclude;
}>;

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

export function deleteRelationship({
  db,
  id,
}: {
  db: PrismaClient;
  id: string;
}) {
  return db.relationship.delete({
    where: { id },
  });
}
