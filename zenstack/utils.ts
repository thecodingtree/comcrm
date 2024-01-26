import { enhance } from '@zenstackhq/runtime';
import { prisma } from '@/server/db';
import { Session } from 'next-auth';

export function getZenstackPrisma(session: Session | null) {
  // create a wrapper of Prisma client that enforces access policy,
  // data validation, and @password, @omit behaviors
  return enhance(prisma, { user: session?.user });
}
