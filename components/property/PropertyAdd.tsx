'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

import { useSession } from 'next-auth/react';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { ADD_PROPERTY } from '@/graphql/mutations';
import { GET_PROPERTIES } from '@/graphql/queries';

import PropertyForm from './form/PropertyForm';

interface PropertyAddProps {
  linkedEntity?: string;
}

export default function PropertyAdd({ linkedEntity }: PropertyAddProps) {
  const { data: session, status } = useSession();
  const [addProperty, { data, loading, error }] = useMutation(ADD_PROPERTY, {
    onCompleted: () => {
      close();
    },
    refetchQueries: [GET_PROPERTIES],
  });
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    addProperty({
      variables: {
        name: values.name,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
        user: session?.user?.id ?? '',
        linkedEntity: linkedEntity ?? null,
      },
    });
  };

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
        Add Property
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <PropertyForm onSubmit={submitHandler} submitting={loading} />
      </Modal>
    </Stack>
  );
}
