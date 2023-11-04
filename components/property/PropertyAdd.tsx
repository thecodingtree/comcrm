'use client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import { PropertyReservedAttributes } from '@/server/sharedTypes';

import PropertyForm, { PropertyFormValues } from './form/PropertyForm';

interface PropertyAddProps {
  linkedEntity?: string;
  onAdd?: () => void;
}

export default function PropertyAdd({
  linkedEntity,
  onAdd,
}: {
  linkedEntity?: string;
  onAdd?: () => void;
}) {
  const createProperty = trpc.property.createProperty.useMutation({
    onSettled: () => close(),
    onSuccess: () => onAdd && onAdd(),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: PropertyFormValues) => {
    const attributes = [];

    if (values.suite) {
      attributes.push({
        name: PropertyReservedAttributes.SUITE,
        value: values.suite,
      });
    }

    if (values.size) {
      attributes.push({
        name: PropertyReservedAttributes.SIZE,
        value: values.size.toString(),
      });
    }

    if (values.price) {
      attributes.push({
        name: PropertyReservedAttributes.PRICE,
        value: values.price.toString(),
      });
    }

    createProperty.mutate({
      name: values.name,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
      attributes,
      linkedEntity,
    });
  };

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
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
