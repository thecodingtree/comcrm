'use client';

import EntityAddDialog from '@/components/entities/EntityAddDialog';

import { type ContactType } from '@/server/sharedTypes';
import { CoreEntityType } from '@prisma/client';

export default function ContactAdd({
  onAdded,
}: {
  onAdded?: (contact: ContactType) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <EntityAddDialog
        triggerLabel="Add Contact"
        entityType={CoreEntityType.CONTACT}
        onAdded={onAdded}
      />
    </div>
  );
}
