import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { TableRow, TableCell } from '@/components/ui/table';

import { useForceUpdate } from '@mantine/hooks';

import { CoreEntityType, RelationshipType } from '@prisma/client';

import { EntityTypeSelect } from '@/components/select/EntityTypeSelect';
import { EntityAutocomplete } from '@/components/entities/EntityAutocomplete';
import { RelationshipTypeSelect } from '@/components/select/RelationshipTypeSelect';
import { trpc } from '@/app/_trpc/client';
import { EntitySearchResult } from '@/server/sharedTypes';

export function AddRelationship({
  fromEntityId,
  fromEntityType,
  refetch,
}: {
  fromEntityId: string;
  fromEntityType: CoreEntityType;
  refetch?: () => void;
}) {
  const [toEntityType, setToEntityType] = useState<CoreEntityType | undefined>(
    undefined
  );
  const [toEntity, setToEntity] = useState<EntitySearchResult | undefined>(
    undefined
  );
  const [relationshipType, setRelationshipType] = useState<
    RelationshipType | undefined
  >(undefined);

  const forceUpdate = useForceUpdate();

  const addRelationship = trpc.relationship.addRelationship.useMutation({
    onSettled: (data) => {
      if (refetch) refetch();
      clearValues();
    },
  });

  const handleAdd = () => {
    addRelationship.mutate({
      type: relationshipType!,
      fromEntityId,
      toEntityId: toEntity?.id!,
    });
  };

  const clearValues = () => {
    setToEntityType(undefined);
    setToEntity(undefined);
    setRelationshipType(undefined);

    forceUpdate();
  };

  return (
    <TableRow key={'add'}>
      <TableCell>
        <EntityTypeSelect
          excludeType={fromEntityType}
          placeholder="Select Type"
          onSelect={(val) => setToEntityType(val)}
        />
      </TableCell>
      <TableCell>
        <EntityAutocomplete
          type={toEntityType || undefined}
          onEntitySelected={(entity) => setToEntity(entity)}
          disabled={!toEntityType}
          withAddOption={true}
        />
      </TableCell>
      <TableCell>
        <RelationshipTypeSelect
          onSelect={(val) => setRelationshipType(val)}
          fromType={fromEntityType}
          toType={toEntityType!}
          disabled={!toEntityType || !toEntity}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleAdd}>Add Relationship</Button>
      </TableCell>
    </TableRow>
  );
}
