import { Prisma, PrismaClient, CoreEntityType } from '@prisma/client';

import { InputMaybe, CoreEntityFilter } from './generated/resolvers-types';

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
  filter?: InputMaybe<CoreEntityFilter>;
}

export const getCoreEntities = async ({
  entityType,
  filter,
}: GetCoreEntitiesArgs): Promise<CoreEntityResult[]> => {
  const results = await prisma.coreEntity.findMany({
    include: coreEntityInclude,
    where: {
      type: entityType,
      userId: filter?.user ? filter.user : undefined,
      OR: filter?.entity
        ? [
            {
              relatedEntities: filter?.entity
                ? { some: { id: filter.entity } }
                : undefined,
            },
            {
              linkedEntities: filter?.entity
                ? { some: { id: filter.entity } }
                : undefined,
            },
          ]
        : undefined,
    },
  });

  return results;
};

export default prisma;
