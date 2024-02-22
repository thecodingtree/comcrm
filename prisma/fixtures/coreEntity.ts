import { PrismaClient, CoreEntityType } from '@prisma/client';

export async function createCoreEntity({
  db,
  type,
  creatorId,
  teamId,
  name,
  surName,
}: {
  db: PrismaClient;
  type: CoreEntityType;
  creatorId: string;
  teamId?: string;
  name: string;
  surName?: string;
}) {
  return await db.coreEntity.create({
    data: {
      type,
      creatorId,
      teamId,
      meta: {
        create: {
          name,
          surName,
        },
      },
    },
  });
}
