import { createTRPCReact } from '@trpc/react-query';

import { type AppRouter } from '@/server/api/routers/root';

export const trpc = createTRPCReact<AppRouter>({});
