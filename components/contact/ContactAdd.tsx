'use client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import ContactForm, { ContactFormValues } from './form/ContactForm';
import { ContactReservedAttributes } from '@/server/sharedTypes';

interface ContactAddProps {
  linkedEntity?: string;
}

export default function ContactAdd({ linkedEntity }: ContactAddProps) {
  const createContact = trpc.contact.createContact.useMutation({
    onSettled: () => close(),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: ContactFormValues) => {
    let attributes = undefined;

    if (values.alt_phone) {
      attributes = [
        {
          name: ContactReservedAttributes.ALT_PHONE,
          value: values.alt_phone,
        },
      ];
    }

    createContact.mutate({
      name: values.name,
      surName: values.surName,
      phone: values.phone,
      email: values.email,
      attributes,
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
