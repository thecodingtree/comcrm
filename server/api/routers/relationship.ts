import {
  getRelationships,
  createRelationship,
  deleteRelationship,
  getRelationshipTypes,
  createRelationshipType,
  updateRelationshipType,
  deleteRelationshipType,
} from '@/server/relationship';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import { CoreEntityType } from '@prisma/client';
import { getCoreEntities } from '@/server/coreEntities';
import {
  EntityFilterInput,
  EntitySearchResult,
  RelationshipFilterInput,
  RelationshipTypeFilterInput,
  RelationshipTypeInput,
} from '@/server/sharedTypes';
import { z } from 'zod';

export const relationshipRouter = createTRPCRouter({
  getRelationshipTypes: protectedProcedure
    .input(z.object({ filter: RelationshipTypeFilterInput.optional() }))
    .query(async ({ ctx, input }) => {
      return await getRelationshipTypes({
        db: ctx.prisma,
        filter: input?.filter,
      });
    }),
  addRelationshipType: protectedProcedure
    .input(RelationshipTypeInput)
    .mutation(async ({ ctx, input }) => {
      return createRelationshipType({
        db: ctx.prisma,
        creator: ctx.session.user.id!,
        ...input,
      });
    }),
  updateRelationshipType: protectedProcedure
    .input(z.object({ id: z.string(), data: RelationshipTypeInput }))
    .mutation(async ({ ctx, input }) => {
      return await updateRelationshipType({
        db: ctx.prisma,
        id: input.id,
        ...input.data,
      });
    }),
  deleteRelationshipType: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await deleteRelationshipType({ db: ctx.prisma, id: input });
    }),
  getRelationshipsForEntity: protectedProcedure
    .input(
      z.object({
        entity: z.string(),
        filter: RelationshipFilterInput.optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await getRelationships({
        db: ctx.prisma,
        filter: { ...input.filter, from: { id: [input.entity] } },
        limit: input.limit,
      });
    }),
  getEntitiesForSearch: protectedProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          filter: EntityFilterInput.optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      // Unlike the normal getCoreEntities behavior, we want to return an empty array if the search or filter is not provided
      if (!input?.filter || !input?.search) return [];

      const result = await getCoreEntities({
        db: ctx.prisma,
        search: input?.search,
        filter: input?.filter,
      });

      const results = result.map((result) => {
        return {
          id: result.id,
          name: `${result.meta?.name!}${
            result.meta?.surName ? ` ${result.meta?.surName!}` : ''
          }`,
          type: result.type,
        } satisfies EntitySearchResult;
      });

      return results;
    }),
  addRelationship: protectedProcedure
    .input(
      z.object({
        fromEntityId: z.string(),
        toEntityId: z.string(),
        typeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createRelationship({
        db: ctx.prisma,
        fromEntityId: input.fromEntityId,
        toEntityId: input.toEntityId,
        typeId: input.typeId,
      });

      return result;
    }),
  deleteRelationship: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await deleteRelationship({ db: ctx.prisma, id: input.id });
    }),
});
