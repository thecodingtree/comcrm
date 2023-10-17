'use client';

import { useMutation } from '@apollo/client';

import { useSession } from 'next-auth/react';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { ADD_CONTACT } from '@/graphql/mutations';
import { GET_CONTACTS } from '@/graphql/queries';

import ContactForm from './form/ContactForm';

interface ContactAddProps {
  linkedEntity?: string;
}

export default function ContactAdd({ linkedEntity }: ContactAddProps) {
  const { data: session, status } = useSession();
  const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT, {
    onCompleted: () => {
      close();
    },
    refetchQueries: [GET_CONTACTS],
  });
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    addContact({
      variables: {
        name: values.name,
        surName: values.surName,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
        user: session?.user?.id ?? '',
        linkedEntity,
      },
    });
  };

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
        Add Contact
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <ContactForm onSubmit={submitHandler} submitting={loading} />
      </Modal>
    </Stack>
  );
}
