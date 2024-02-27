'use client';

import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { Button } from '@/components/ui/button';
import SettingCard from '../common/SettingCard';

import AddDialog from '../relationship/AddTypeDialog';
import { IconAdd } from '../common/icons';
import RelationshipTypeList from '../relationship/RelationshipTypeList';
import RelationshipTypeListSkeleton from '../relationship/RelationshipTypeListSkeleton';
import {
  RelationshipTypeData,
  RelationshipTypeFilter,
} from '@/server/sharedTypes';
import { toast } from 'sonner';
import RelationshipTypeFilters from '../relationship/RelationshipTypeFilters';

export default function UpdateRelationshipTypes() {
  const [filter, setFilter] = useState<RelationshipTypeFilter | undefined>({
    entity: undefined,
    category: undefined,
  });

  const { data, isLoading, refetch } =
    trpc.relationship.getRelationshipTypes.useQuery({ filter });

  const updateRelationshipType =
    trpc.relationship.updateRelationshipType.useMutation();

  const deleteRelationshipType =
    trpc.relationship.deleteRelationshipType.useMutation();

  const handleEdit = (type: RelationshipTypeData) => {
    updateRelationshipType.mutate(
      {
        id: type.id!,
        data: type,
      },
      {
        onSettled: () => {
          refetch();
          toast.success('Relationship type updated');
        },
      },
    );
  };

  const handleDelete = (id: string) => {
    deleteRelationshipType.mutate(id, {
      onSettled: () => {
        refetch();
        toast.success('Relationship type deleted');
      },
    });
  };

  return (
    <SettingCard title="Relationship Types">
      <div className="flex flex-row gap-4">
        <AddDialog onAdded={refetch}>
          <Button className="rounded-full" size="icon" variant="outline">
            <IconAdd className="w-4 h-4" />
          </Button>
        </AddDialog>
        <RelationshipTypeFilters filters={filter} onFilterChange={setFilter} />
      </div>
      {!isLoading ? (
        <RelationshipTypeList
          types={data}
          onEditType={handleEdit}
          onDeleteType={handleDelete}
        />
      ) : (
        <RelationshipTypeListSkeleton />
      )}
    </SettingCard>
  );
}
