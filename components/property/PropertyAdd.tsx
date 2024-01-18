'use client';

import EntityAddDialog from '@/components/entities/EntityAddDialog';

import { PropertyType } from '@/server/sharedTypes';
import { CoreEntityType } from '@prisma/client';

export default function PropertyAdd({
  onAdded,
}: {
  onAdded?: (property: PropertyType) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <EntityAddDialog
        triggerLabel="Add Property"
        entityType={CoreEntityType.PROPERTY}
        onAdded={onAdded}
      />
    </div>
  );
}
