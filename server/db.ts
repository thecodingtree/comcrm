import { getZenstackPrisma } from '@/zenstack/utils';
import { Session } from 'next-auth';

import prisma from '@/prisma/client';

export async function getEnhancedDB(session: Session) {
  return getZenstackPrisma(prisma, session);
}
