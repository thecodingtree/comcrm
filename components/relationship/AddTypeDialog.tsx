import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { RelationshipTypeData } from '@/server/sharedTypes';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import RelationshipTypeForm from '@/components/relationship/RelationshipTypeForm';
import { CoreEntityType } from '@prisma/client';

export default function AddTypeDialog({
  from,
  to,
  children,
  onAdded,
}: {
  from?: CoreEntityType;
  to?: CoreEntityType;
  children: React.ReactNode;
  onAdded?: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const addRelationshipType =
    trpc.relationship.addRelationshipType.useMutation();

  const handleSubmit = (values: RelationshipTypeData) => {
    setSubmitting(true);
    addRelationshipType.mutate(values, {
      onSuccess: (data) => {
        setOpened(false);
        onAdded?.();
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <RelationshipTypeForm
          type={{ from: from, to: to }}
          submitLabel="Add Type"
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
