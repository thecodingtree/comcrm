import { Prisma, PrismaClient, CoreEntityType } from '@prisma/client';

import { EntityFilterType, SessionUser } from '@/server/sharedTypes';
import { getTeamUser } from './team';

const coreEntityInclude = Prisma.validator<Prisma.CoreEntityInclude>()({
  meta: { include: { address: true } },
  attributes: true,
  creator: true,
  team: { include: { members: { include: { user: true } } } },
});

export type CoreEntityResult = Prisma.CoreEntityGetPayload<{
  include: typeof coreEntityInclude;
}>;

const buildCEWhere = (
  search?: string,
  filter?: EntityFilterType,
): Prisma.CoreEntityWhereInput | undefined => {
  let hasSearch = false;
  let hasFilters = false;

  const filterWhere: Prisma.CoreEntityWhereInput = { AND: [] };
  const searchWhere: Prisma.CoreEntityWhereInput = { OR: [] };

  if (search && search.length > 0) {
    hasSearch = true;

    const searchTokens = search.trim().split(' ');

    // Normalize search query to the form "word1:* <-> word2:* ..."
    const searchQuery = searchTokens
      .map((s) => (s.length > 0 ? `${s}:*` : ''))
      .reduce((acc, s) => (s?.length ? `${acc} & ${s}` : acc));

    // Search by name
    searchWhere.OR?.push({
      meta: {
        OR: [
          { name: { search: searchQuery } },
          { surName: { search: searchQuery } },
        ],
      },
    });

    searchWhere.OR?.push({
      type: { in: [CoreEntityType.CONTACT] },
      meta: {
        AND: [
          { name: { search: search.trim().split(' ')[0] } },
          { surName: { search: searchQuery } },
        ],
      },
    });

    // search by address
    searchWhere.OR?.push({
      meta: {
        address: {
          OR: [
            { street: { search: searchQuery } },
            { city: { search: searchQuery } },
          ],
        },
      },
    });

    // search by attributes
    searchWhere.OR?.push({
      attributes: { some: { value: { search: searchQuery } } },
    });
  }

  if (filter?.type) {
    hasFilters = true;
    (filterWhere.AND as Prisma.CoreEntityWhereInput[])?.push({
      type: filter?.type ? { in: filter?.type } : undefined,
    });
  }

  if (filter?.creator) {
    hasFilters = true;
    (filterWhere.AND as Prisma.CoreEntityWhereInput[])?.push({
      creator: { id: { in: filter?.creator } },
    });
  }

  // TODO: I don't love this, but it's a quick fix for now
  return hasSearch && hasFilters
    ? { AND: [searchWhere, filterWhere] }
    : hasSearch
      ? searchWhere
      : hasFilters
        ? filterWhere
        : undefined;
};

export const getCoreEntities = ({
  db,
  search,
  filter,
}: {
  db: PrismaClient;
  search?: string;
  filter?: EntityFilterType;
}): Promise<CoreEntityResult[]> => {
  const results = db.coreEntity.findMany({
    include: coreEntityInclude,
    where: buildCEWhere(search, filter),
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
  user,
}: {
  db: PrismaClient;
  data: Prisma.CoreEntityCreateInput;
  user?: SessionUser;
}) => {
  const teamUser = await getTeamUser({ db, user: user?.id });

  return db.coreEntity.create({
    data: {
      ...data,
      team: teamUser?.team
        ? { connect: { id: teamUser?.team?.id } }
        : undefined,
    },
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
