import {
  getRelationshipsForEntity,
  createRelationship,
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
    .input(z.object({ entityId: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getRelationshipsForEntity({
        db: ctx.prisma,
        entityId: input.entityId,
        limit: input.limit,
      });
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
