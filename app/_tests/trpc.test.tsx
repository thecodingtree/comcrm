import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Session } from 'next-auth';

import { createInnerTRPCContext } from '@/server/api/trpc';
import { appRouter, AppRouter } from '@/server/api/root';

// 1- mock prisma module
vi.mock('@/server/__mocks__/db');

interface TRPCTestContext {
  session: Session;
  trpcContext: ReturnType<typeof createInnerTRPCContext>;
  trpcClient: AppRouter;
}

// 3- Reset everything
beforeEach<TRPCTestContext>(async (context) => {
  vi.restoreAllMocks();

  const session = {
    expires: '1',
    user: {
      id: 'clgb17vnp000008jjere5g15i',
    },
  };

  // 5- init tRPC for test
  const trpcContext = createInnerTRPCContext({
    session,
    headers: new Headers(),
  });
  const trpcCaller = appRouter.createCaller({
    ...trpcContext,
    prisma: trpcContext.prisma,
  });

  context.session = session;
  context.trpcContext = trpcContext;
  context.trpcClient = trpcCaller;
});

// 2- our tests
describe('TRPC Example Tests', () => {
  it<TRPCTestContext>('should return a list of public todos', async ({
    trpcClient,
  }) => {
    const todos = await trpcClient.todo.getTodos();

    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Hello');
  });

  it<TRPCTestContext>('should return a list of protected todos', async ({
    trpcClient,
  }) => {
    const todos = await trpcClient.todo.getTodosAuthed();

    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Hello');
  });

  it<TRPCTestContext>('should return a single todo', async ({ trpcClient }) => {
    const contacts = await trpcClient.contact.getContacts();

    console.log('contacts', contacts);

    expect(contacts).toBeDefined();
  });
});
