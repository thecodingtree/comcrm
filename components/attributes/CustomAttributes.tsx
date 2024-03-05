import React, { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { AttributeType } from '@/server/sharedTypes';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { DeleteButton, EditButton } from '@/components/controls/Buttons';

import CustomAttributeForm from '@/components/attributes/CustomAttributeForm';
import CustomAttributeSkeleton from '@/components/attributes/CustomAttributeSkeleton';

export default function CustomAttributes({ entityId }: { entityId: string }) {
  const { data, isLoading, refetch } = trpc.attributes.getAttributes.useQuery({
    entityId,
  });

  const [opened, setOpened] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState<AttributeType | undefined>(
    undefined,
  );

  const updateOrCreateAttribute =
    trpc.attributes.updateOrCreateAttribute.useMutation();

  const deleteAttribute = trpc.attributes.deleteAttribute.useMutation();

  const handleSubmit = (value: AttributeType) => {
    setSubmitting(true);

    updateOrCreateAttribute.mutate(
      { ...value, custom: true, entityId },
      {
        onSettled: () => {
          setSubmitting(false);
          setOpened(false);
          refetch();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-slate-200 p-4">
      <div className="text-lg font-bold">Custom Attributes</div>
      {isLoading ? (
        <CustomAttributeSkeleton />
      ) : (
        data?.map((attr) => (
          <div key={attr.id}>
            <div>
              {attr.name}: {attr.value}
            </div>
            <EditButton
              onClick={() => {
                setSelectedAttr(attr);
                setOpened(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                deleteAttribute.mutate(
                  { id: attr.id },
                  { onSettled: () => refetch() },
                );
              }}
            />
          </div>
        ))
      )}
      {!isLoading && (
        <Button
          onClick={() => {
            setSelectedAttr(undefined);
            setOpened(true);
          }}
        >
          Add Value
        </Button>
      )}
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogContent>
          <CustomAttributeForm
            defaultValues={selectedAttr}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
