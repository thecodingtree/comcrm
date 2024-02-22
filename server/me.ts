import { PrismaClient } from '@prisma/client';
import { getAuthedServerSession } from '@/server/utils';

export async function getMe({ db, user }: { db: PrismaClient; user?: string }) {
  if (!user) {
    const session = await getAuthedServerSession();
    user = session?.user?.id;
  }

  return db.user.findUnique({
    where: { id: user },
  });
}

export async function updateMe({
  db,
  name,
  image,
  user,
}: {
  db: PrismaClient;
  name?: string;
  image?: string;
  user?: string;
}) {
  if (!user) {
    const session = await getAuthedServerSession();
    user = session?.user?.id;
  }

  const updateData = {
    name,
    image,
  };

  return db.user.update({
    where: { id: user },
    data: updateData,
  });
}
