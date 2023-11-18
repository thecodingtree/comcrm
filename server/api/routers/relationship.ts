import { RelationshipResult, relationshipInclude } from '@/db';
import { protectedProcedure, createTRPCRouter } from '@/server/api/trpc';
import {
  CoreEntityType,
  RelationshipType as PrismaRelationshipType,
} from '@prisma/client';
import { getOwnedCoreEntities } from '@/db';
import {
  RelationshipType,
  EntityFilterInput,
  EntitySearchResult,
} from '@/server/sharedTypes';
import { z } from 'zod';

export const relationshipRouter = createTRPCRouter({
  getRelationshipsForEntity: protectedProcedure
    .input(z.object({ entityId: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.relationship.findMany({
        include: relationshipInclude,
        where: { fromEntityId: input.entityId! },
        orderBy: { createdAt: 'desc' },
        take: input?.limit ?? 10,
      });

      const results = result.map((relationship: RelationshipResult) => {
        return {
          id: relationship.id,
          from: {
            id: relationship.from.id,
            name: relationship.from.meta?.name!,
            type: relationship.from.type,
          },
          to: {
            id: relationship.to.id,
            name: relationship.to.meta?.name!,
            type: relationship.to.type,
          },
          type: relationship.type,
          createdAt: relationship.createdAt,
          updatedAt: relationship.updatedAt,
        } satisfies RelationshipType;
      });

      return results;
    }),
  getEntitiesForSearch: protectedProcedure
    .input(
      z
        .object({
          filter: EntityFilterInput.optional(),
          type: z.nativeEnum(CoreEntityType).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (!input?.filter) return [];

      const result = await getOwnedCoreEntities({
        db: ctx.prisma,
        entityType: input?.type,
        filter: input?.filter,
        withUserId: ctx.session.user.id,
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
        type: z.nativeEnum(PrismaRelationshipType),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.relationship.create({
        data: {
          fromEntityId: input.fromEntityId,
          toEntityId: input.toEntityId,
          type: input.type,
        },
      });

      return result;
    }),
});
