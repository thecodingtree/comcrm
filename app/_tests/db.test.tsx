import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type PrismaClient } from '@prisma/client';
import { getZenstackPrisma } from '@/zenstack/utils';

import mockPrisma from '@/libs/__mocks__/prisma';

import { contactCreator } from '@/server/api/creators';

import { mockDeep } from 'vitest-mock-extended';

// 1- mock prisma module
vi.mock('@/libs/__mocks__/prisma');

interface DBTestContext {
  db: PrismaClient;
}

// 3- Reset everything
beforeEach<DBTestContext>(async (context) => {
  vi.restoreAllMocks();

  // 4- mock session
  const session = {
    expires: '1',
    user: null,
  };
  // 5
  context.db = getZenstackPrisma(mockPrisma, null);
});

// 2- our tests
describe('DB Example Tests', () => {
  it<DBTestContext>('should create Contact', async ({ db }) => {
    const testMock = mockDeep<PrismaClient>();

    testMock.coreEntity.create.mockResolvedValue({
      id: '1',
      type: 'PROPERTY',
      creatorId: '1',
      teamId: null,
      private: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await contactCreator({
      db: testMock,
      user: { id: '1', email: 'test@example' },
      data: { name: 'test', surName: 'testerson', email: 'test@example' },
    });

    expect(result).toBeDefined();
  });
});
