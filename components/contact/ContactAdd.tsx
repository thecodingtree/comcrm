'use client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import ContactForm from './form/ContactForm';

interface ContactAddProps {
  linkedEntity?: string;
}

export default function ContactAdd({ linkedEntity }: ContactAddProps) {
  const createContact = trpc.contact.createContact.useMutation({
    onSettled: () => close(),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    createContact.mutate({
      name: values.name,
      surName: values.surName,
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
        Add Contact
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <ContactForm
          onSubmit={submitHandler}
          submitting={createContact.isLoading}
        />
      </Modal>
    </Stack>
  );
}
