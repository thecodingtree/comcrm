'use client';

import { useState } from 'react';

import { type CoreEntityType } from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import { type RelationshipFilter } from '@/server/sharedTypes';

import { AddRelationship } from '../tables/AddRelationship';
import RelationshipItem from './RelationshipItem';
import RelationshipFilters from './RelationshipFilters';

export default function RelationshipsList({
  fromId,
  fromType,
}: {
  fromId: string;
  fromType: CoreEntityType;
}) {
  const [filters, setFilters] = useState<RelationshipFilter | undefined>(
    undefined,
  );
  const { data, refetch } =
    trpc.relationship.getRelationshipsForEntity.useQuery({
      entity: fromId,
      filter: filters,
      limit: 10,
    });

  const deleteRelationship = trpc.relationship.deleteRelationship.useMutation();

  return (
    <div className="flex flex-col gap-2 border-2 rounded-sm p-4">
      <div>
        <RelationshipFilters
          filters={filters}
          onFilterChange={(filters) => setFilters(filters)}
        />
      </div>
      {data?.map((rel) => (
        <div key={rel.id} className="">
          <RelationshipItem
            relationship={rel}
            onDelete={() =>
              deleteRelationship.mutate(
                { id: rel.id },
                { onSuccess: () => refetch() },
              )
            }
          />
        </div>
      ))}
      <AddRelationship
        fromEntityId={fromId}
        fromEntityType={fromType}
        refetch={refetch}
      />
    </div>
  );
}
