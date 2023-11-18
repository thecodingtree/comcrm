'use client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import ContactForm, { ContactFormValues } from './form/ContactForm';
import { ContactType } from '@/server/sharedTypes';
import { buildContactMutatePayload } from './utils';

export default function ContactAdd({
  onAdded,
}: {
  onAdded?: (contact: ContactType) => void;
}) {
  const createContact = trpc.contact.createContact.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: ContactFormValues) =>
    createContact.mutate(buildContactMutatePayload({ values }));

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
        Add Contact
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        closeOnClickOutside={false}
      >
        <ContactForm
          onSubmit={submitHandler}
          submitting={createContact.isLoading}
        />
      </Modal>
    </Stack>
  );
}
