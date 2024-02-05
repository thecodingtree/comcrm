import { enhance } from '@zenstackhq/runtime';
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';

export function getZenstackPrisma(
  prisma: PrismaClient,
  session: Session | null,
) {
  // create a wrapper of Prisma client that enforces access policy,
  // data validation, and @password, @omit behaviors
  return enhance(prisma, { user: session?.user });
}
