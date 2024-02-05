import type { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset(mockPrisma);
});

const mockPrisma: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

export default mockPrisma;
