import { getZenstackPrisma } from '@/zenstack/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import prisma from '@/prisma/client';

export async function getEnhancedDB() {
  const session = await getServerSession(authOptions);

  return getZenstackPrisma(prisma, session);
}
