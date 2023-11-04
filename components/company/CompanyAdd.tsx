'use client';

import { trpc } from '@/app/_trpc/client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { CompanyReservedAttributes } from '@/server/sharedTypes';

import CompanyForm, { CompanyFormValues } from './form/CompanyForm';

export default function CompanyAdd({
  linkedEntity,
  onAdd,
}: {
  linkedEntity?: string;
  onAdd?: () => void;
}) {
  const createCompany = trpc.company.createCompany.useMutation({
    onSettled: () => close(),
    onSuccess: () => onAdd && onAdd(),
  });
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: CompanyFormValues) => {
    let attributes = [];

    if (values.website) {
      attributes.push({
        name: CompanyReservedAttributes.WEBSITE,
        value: values.website,
      });
    }

    if (values.size) {
      attributes.push({
        name: CompanyReservedAttributes.SIZE,
        value: values.size.toString(),
      });
    }

    createCompany.mutate({
      name: values.name,
      phone: values.phone,
      email: values.email,
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
        Add Company
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        closeOnClickOutside={false}
      >
        <CompanyForm
          onSubmit={submitHandler}
          submitting={createCompany.isLoading}
        />
      </Modal>
    </Stack>
  );
}
