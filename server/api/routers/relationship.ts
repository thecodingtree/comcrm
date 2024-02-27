import {
  RelationshipResult,
  getRelationshipsForEntity,
  createRelationship,
  getRelationshipTypes,
} from '@/server/relationship';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import {
  CoreEntityType,
  RelationshipType as PrismaRelationshipType,
} from '@prisma/client';
import { getCoreEntities } from '@/server/coreEntities';
import {
  EntityFilterInput,
  EntitySearchResult,
  RelationshipTypeFilterInput,
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
  getRelationshipsForEntity: protectedProcedure
    .input(z.object({ entityId: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getRelationshipsForEntity({
        db: ctx.prisma,
        entityId: input.entityId,
        limit: input.limit,
      });

      // const results = result.map((relationship: RelationshipResult) => {
      //   return {
      //     id: relationship.id,
      //     from: {
      //       id: relationship.from.id,
      //       name: relationship.from.meta?.name!,
      //       type: relationship.from.type,
      //     },
      //     to: {
      //       id: relationship.to.id,
      //       name: relationship.to.meta?.name!,
      //       type: relationship.to.type,
      //     },
      //     type: relationship.type,
      //     createdAt: relationship.createdAt,
      //     updatedAt: relationship.updatedAt,
      //   } satisfies RelationshipType;
      // });
    }),
  getEntitiesForSearch: protectedProcedure
    .input(
      z
        .object({
          filter: EntityFilterInput.optional(),
          type: z.nativeEnum(CoreEntityType).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      if (!input?.filter) return [];

      const result = await getCoreEntities({
        db: ctx.prisma,
        entityType: input?.type,
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
});
