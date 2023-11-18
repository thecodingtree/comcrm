import { Prisma, PrismaClient, CoreEntityType } from '@prisma/client';

import { EntityFilterType } from '@/server/sharedTypes';

//const prisma = new PrismaClient();

const coreEntityInclude = Prisma.validator<Prisma.CoreEntityInclude>()({
  meta: { include: { address: true } },
  attributes: true,
  user: true,
});

export type CoreEntityResult = Prisma.CoreEntityGetPayload<{
  include: typeof coreEntityInclude;
}>;

export const relationshipInclude =
  Prisma.validator<Prisma.RelationshipInclude>()({
    from: { include: { meta: true } },
    to: { include: { meta: true } },
  });

export type RelationshipResult = Prisma.RelationshipGetPayload<{
  include: typeof relationshipInclude;
}>;

const buildCoreEntitiesORFilters = (filter?: EntityFilterType) => {
  const filterORs: Prisma.CoreEntityWhereInput[] = [];

  if (filter?.id) {
    filterORs.push({
      relatedEntities: filter?.id ? { some: { id: filter.id } } : undefined,
    });

    filterORs.push({
      linkedEntities: filter?.id ? { some: { id: filter.id } } : undefined,
    });
  }

  if (filter?.name) {
    filterORs.push({
      meta: { name: { contains: filter.name } },
    });
  }

  if (filter?.email) {
    filterORs.push({
      meta: { email: { contains: filter.email } },
    });
  }

  return filterORs.length > 0 ? filterORs : undefined;
};

export const getOwnedCoreEntities = async ({
  db,
  entityType,
  filter,
  withUserId,
}: {
  db: PrismaClient;
  entityType?: CoreEntityType;
  filter?: EntityFilterType;
  withUserId?: string;
}): Promise<CoreEntityResult[]> => {
  if (!withUserId) {
    return [];
  }

  const results = await db.coreEntity.findMany({
    include: coreEntityInclude,
    where: {
      type: entityType,
      userId: withUserId,
      OR: buildCoreEntitiesORFilters(filter),
    },
  });

  return results;
};

export const getOwnedCoreEntity = async (
  db: PrismaClient,
  id: string,
  withUserId: string
): Promise<CoreEntityResult | null> => {
  if (!withUserId) {
    return null;
  }

  const result = await db.coreEntity.findUnique({
    include: coreEntityInclude,
    where: { id, userId: withUserId },
  });

  if (!result) {
    throw new Error(`CoreEntity with ID ${id} not found`);
  }

  return result;
};

// CRUD operations
export const createCoreEntity = (
  db: PrismaClient,
  data: Prisma.CoreEntityCreateInput
) =>
  db.coreEntity.create({
    data,
    include: coreEntityInclude,
  });

export const updateCoreEntity = (
  db: PrismaClient,
  id: string,
  user: string,
  data: Prisma.CoreEntityUpdateInput
) =>
  db.coreEntity.update({
    include: coreEntityInclude,
    where: { id, userId: user },
    data,
  });

export const deleteCoreEntity = (db: PrismaClient, id: string, user: string) =>
  db.coreEntity.delete({
    include: coreEntityInclude,
    where: { id, userId: user },
  });

export const getNoteForEntity = async (entityId: string) => {};
