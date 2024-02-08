import { Prisma, PrismaClient, CoreEntityType } from '@prisma/client';

import { EntityFilterType } from '@/server/sharedTypes';
import { getTeamForUser } from './team';

const coreEntityInclude = Prisma.validator<Prisma.CoreEntityInclude>()({
  meta: { include: { address: true } },
  attributes: true,
  owner: true,
  team: { include: { members: { include: { user: true } } } },
});

export type CoreEntityResult = Prisma.CoreEntityGetPayload<{
  include: typeof coreEntityInclude;
}>;

const buildCoreEntitiesORFilters = (filter?: EntityFilterType) => {
  const filterORs: Prisma.CoreEntityWhereInput[] = [];

  if (filter?.id) {
    filterORs.push({
      relationshipsFrom: filter?.id ? { some: { id: filter.id } } : undefined,
    });

    filterORs.push({
      relationshipsTo: filter?.id ? { some: { id: filter.id } } : undefined,
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

export const getCoreEntities = ({
  db,
  entityType,
  filter,
}: {
  db: PrismaClient;
  entityType?: CoreEntityType;
  filter?: EntityFilterType;
  withUserId?: string;
}): Promise<CoreEntityResult[]> => {
  const results = db.coreEntity.findMany({
    include: coreEntityInclude,
    where: {
      type: entityType,
      OR: buildCoreEntitiesORFilters(filter),
    },
  });

  return results;
};

export const getCoreEntity = ({
  db,
  id,
}: {
  db: PrismaClient;
  id: string;
}): Promise<CoreEntityResult | null> => {
  const result = db.coreEntity.findUnique({
    include: coreEntityInclude,
    where: { id },
  });

  return result;
};

// CRUD operations
export const createCoreEntity = async ({
  db,
  data,
}: {
  db: PrismaClient;
  data: Prisma.CoreEntityCreateInput;
}) => {
  const team = await getTeamForUser({ db });

  return db.coreEntity.create({
    data: { ...data, team: team ? { connect: { id: team?.id } } : undefined },
    include: coreEntityInclude,
  });
};

export const updateCoreEntity = ({
  db,
  id,
  data,
}: {
  db: PrismaClient;
  id: string;
  data: Prisma.CoreEntityUpdateInput;
}) =>
  db.coreEntity.update({
    include: coreEntityInclude,
    where: { id },
    data,
  });

export const deleteCoreEntity = ({
  db,
  id,
}: {
  db: PrismaClient;
  id: string;
}) =>
  db.coreEntity.delete({
    include: coreEntityInclude,
    where: { id },
  });
