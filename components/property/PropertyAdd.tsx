'use client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Modal } from '@mantine/core';
import { Button } from '@/components/ui/button';

import { trpc } from '@/app/_trpc/client';

import { PropertyType } from '@/server/sharedTypes';

import PropertyForm, { PropertyFormValues } from './form/PropertyForm';
import { buildPropertyMutatePayload } from './utils';

export default function PropertyAdd({
  onAdded,
}: {
  onAdded?: (property: PropertyType) => void;
}) {
  const createProperty = trpc.property.createProperty.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: PropertyFormValues) =>
    createProperty.mutate(buildPropertyMutatePayload({ values }));

  return (
    <Stack align="center">
      <Button onClick={open} className="w-[400px]">
        Add Property
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        closeOnClickOutside={false}
      >
        <PropertyForm
          onSubmit={submitHandler}
          submitting={createProperty.isLoading}
        />
      </Modal>
    </Stack>
  );
}
