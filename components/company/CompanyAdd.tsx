'use client';

import { useMutation } from '@apollo/client';

import { useDisclosure } from '@mantine/hooks';
import { Stack, Button, Modal } from '@mantine/core';

import { ADD_COMPANY } from '@/graphql/mutations';
import { GET_COMPANIES } from '@/graphql/queries';

import CompanyForm from './form/CompanyForm';

interface CompanyAddProps {
  linkedEntity?: string;
}

export default function CompanyAdd({ linkedEntity }: CompanyAddProps) {
  const [addCompany, { data, loading, error }] = useMutation(ADD_COMPANY, {
    onCompleted: () => {
      close();
    },
    refetchQueries: [GET_COMPANIES],
  });
  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (values: any) => {
    addCompany({
      variables: {
        name: values.name,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
        linkedEntity: linkedEntity ?? null,
      },
    });
  };

  return (
    <Stack align="center">
      <Button onClick={open} w={400}>
        Add Company
      </Button>
      <Modal opened={opened} onClose={close} size="lg" centered>
        <CompanyForm onSubmit={submitHandler} submitting={loading} />
      </Modal>
    </Stack>
  );
}
