import { Prisma, PrismaClient, CoreEntityType } from '@prisma/client';

import { EntityFilterType } from '@/server/sharedTypes';

const prisma = new PrismaClient();

const coreEntityInclude = Prisma.validator<Prisma.CoreEntityInclude>()({
  meta: { include: { address: true } },
  attributes: true,
  user: true,
});

export type CoreEntityResult = Prisma.CoreEntityGetPayload<{
  include: typeof coreEntityInclude;
}>;

interface GetCoreEntitiesArgs {
  entityType: CoreEntityType;
  filter?: EntityFilterType;
  withUserId?: string;
}

export const getOwnedCoreEntities = async ({
  entityType,
  filter,
  withUserId,
}: GetCoreEntitiesArgs): Promise<CoreEntityResult[]> => {
  if (!withUserId) {
    return [];
  }

  const results = await prisma.coreEntity.findMany({
    include: coreEntityInclude,
    where: {
      type: entityType,
      userId: withUserId,
      OR: filter?.id
        ? [
            {
              relatedEntities: filter?.id
                ? { some: { id: filter.id } }
                : undefined,
            },
            {
              linkedEntities: filter?.id
                ? { some: { id: filter.id } }
                : undefined,
            },
          ]
        : undefined,
    },
  });

  return results;
};

export const getOwnedCoreEntity = async (
  id: string,
  withUserId: string
): Promise<CoreEntityResult | null> => {
  if (!withUserId) {
    return null;
  }

  const result = await prisma.coreEntity.findUnique({
    include: coreEntityInclude,
    where: { id, userId: withUserId },
  });

  if (!result) {
    throw new Error(`CoreEntity with ID ${id} not found`);
  }

  return result;
};

// CRUD operations
export const createCoreEntity = (data: Prisma.CoreEntityCreateInput) =>
  prisma.coreEntity.create({
    data,
    include: coreEntityInclude,
  });

export const updateCoreEntity = (
  id: string,
  user: string,
  data: Prisma.CoreEntityUpdateInput
) =>
  prisma.coreEntity.update({
    include: coreEntityInclude,
    where: { id, userId: user },
    data,
  });

export const deleteCoreEntity = (id: string, user: string) =>
  prisma.coreEntity.delete({
    include: coreEntityInclude,
    where: { id, userId: user },
  });

export const getNoteForEntity = async (entityId: string) => {};

export default prisma;
