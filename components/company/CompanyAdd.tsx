'use client';

import { trpc } from '@/app/_trpc/client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { CompanyType } from '@/server/sharedTypes';

import CompanyForm, { CompanyFormValues } from './form/CompanyForm';

import { buildCompanyMutatePayload } from './utils';

export default function CompanyAdd({
  onAdded,
}: {
  onAdded?: (company: CompanyType) => void;
}) {
  const createCompany = trpc.company.createCompany.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: CompanyFormValues) =>
    createCompany.mutate(buildCompanyMutatePayload({ values }));

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
