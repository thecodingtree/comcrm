import { PrismaClient, CoreEntityType } from '@prisma/client';

export async function createCoreEntity({
  db,
  type,
  ownerId,
  teamId,
  name,
  surName,
}: {
  db: PrismaClient;
  type: CoreEntityType;
  ownerId: string;
  teamId?: string;
  name: string;
  surName?: string;
}) {
  return await db.coreEntity.create({
    data: {
      type,
      ownerId,
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
