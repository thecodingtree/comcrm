import { PrismaClient } from '@prisma/client';
import { getAuthedServerSession } from './utils';

export async function getTasksForUser({
  db,
  user,
  filter,
}: {
  db: PrismaClient;
  user?: string;
  filter?: {
    category?: string;
  };
}) {
  if (!user) {
    const session = await getAuthedServerSession();
    user = session?.user?.id;
  }

  const filters = filter
    ? {
        category: { id: filter.category },
      }
    : {};

  return db.task.findMany({
    include: { category: true },
    where: { OR: [{ creatorId: user }, { assigneeId: user }], AND: filters },
  });
}
