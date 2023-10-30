'use client';

import { useRouter } from 'next/navigation';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import PropertyForm from './form/PropertyForm';

interface PropertyAddProps {
  linkedEntity?: string;
}

export default function PropertyAdd({ linkedEntity }: PropertyAddProps) {
  const createProperty = trpc.property.createProperty.useMutation({
    onSettled: () => close(),
  });

  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    createProperty.mutate({
      name: values.name,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
      linkedEntity,
    });
  };

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
        Add Property
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <PropertyForm
          onSubmit={submitHandler}
          submitting={createProperty.isLoading}
        />
      </Modal>
    </Stack>
  );
}
