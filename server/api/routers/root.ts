import { todoRouter } from '@/server/api/routers/todo';
import { notesRouter } from '@/server/api/routers/notes';
import { contactRouter } from '@/server/api/routers/contact';
import { companyRouter } from '@/server/api/routers/company';
import { propertyRouter } from '@/server/api/routers/property';
import { createTRPCRouter } from '@/server/api/trpc';
import { attributesRouter } from './attributes';
import { relationshipRouter } from './relationship';
import { teamRouter } from './team';
import { taskRouter } from './task';
import { meRouter } from './me';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  notes: notesRouter,
  contact: contactRouter,
  company: companyRouter,
  property: propertyRouter,
  attributes: attributesRouter,
  relationship: relationshipRouter,
  team: teamRouter,
  task: taskRouter,
  me: meRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
