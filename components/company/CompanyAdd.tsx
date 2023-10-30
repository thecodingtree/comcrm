'use client';

import { trpc } from '@/app/_trpc/client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import CompanyForm from './form/CompanyForm';

interface CompanyAddProps {
  linkedEntity?: string;
}

export default function CompanyAdd({ linkedEntity }: CompanyAddProps) {
  const createCompany = trpc.company.createCompany.useMutation({
    onSettled: () => close(),
  });
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    createCompany.mutate({
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
        Add Company
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <CompanyForm
          onSubmit={submitHandler}
          submitting={createCompany.isLoading}
        />
      </Modal>
    </Stack>
  );
}
