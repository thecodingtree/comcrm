import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { RelationshipTypeData } from '@/server/sharedTypes';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import RelationshipTypeForm from '@/components/relationship/RelationshipTypeForm';

export default function AddTypeDialog({
  children,
  onAdded,
}: {
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
    <div>
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <RelationshipTypeForm
            submitLabel="Add Type"
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
