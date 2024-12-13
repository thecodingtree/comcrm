'use client';

import { useState } from 'react';

import useUser from '@/hooks/useUser';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

import { type RelationshipTypeResult } from '@/server/relationship';
import RelationshipTypeItem from './RelationshipTypeItem';
import { type RelationshipTypeData } from '@/server/sharedTypes';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import RelationshipTypeForm from '@/components/relationship/RelationshipTypeForm';

export default function RelationshipTypeList({
  types,
  onEditType,
  onDeleteType,
}: {
  types?: RelationshipTypeResult[];
  onEditType?: (type: RelationshipTypeData) => void;
  onDeleteType?: (id: string) => void;
}) {
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    RelationshipTypeData | undefined
  >(undefined);

  const handleSubmit = (values: RelationshipTypeData) => {
    setOpened(false);
    setSelectedType(undefined);
    onEditType?.(values);
  };

  return (
    <div className="flex flex-col gap-2">
      {types?.map((type) => (
        <div key={type.id} className="w-[100%]">
          <RelationshipTypeItem
            type={type}
            onEditClicked={() => {
              setSelectedType(type as RelationshipTypeData);
              setOpened(true);
            }}
            onDeleteClicked={() => {
              setSelectedType(type as RelationshipTypeData);
              setAlertOpen(true);
            }}
            editable={type.creatorId === user?.id}
          />
        </div>
      ))}
      <div>
        <Dialog open={opened} onOpenChange={setOpened}>
          <DialogContent>
            <RelationshipTypeForm
              type={selectedType}
              submitLabel="Edit Type"
              onSubmit={(values) =>
                handleSubmit({ id: selectedType?.id, ...values })
              }
            />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                type and all &quot;Relationships&quot; associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={() => onDeleteType?.(selectedType?.id!)}
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
