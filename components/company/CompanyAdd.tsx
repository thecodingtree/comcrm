'use client';

import { CompanyType } from '@/server/sharedTypes';

import EntityAddDialog from '@/components/entities/EntityAddDialog';

import { CoreEntityType } from '@prisma/client';

export default function CompanyAdd({
  onAdded,
}: {
  onAdded?: (company: CompanyType) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <EntityAddDialog
        triggerLabel="Add Company"
        entityType={CoreEntityType.COMPANY}
        onAdded={onAdded}
      />
    </div>
  );
}
