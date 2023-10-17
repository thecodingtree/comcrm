'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_PROPERTY } from '@/graphql/mutations';

import { GET_COMPANIES } from '@/graphql/queries';

import { Space, Box } from '@mantine/core';

import CompaniesTable from '@/components/company/CompaniesTable';
import CompanyAdd from '@/components/company/CompanyAdd';
import ReloadQuery from '@/components/controls/ReloadQuery';

export default function CompaniesPage() {
  const { data, loading, error, refetch } = useQuery(GET_COMPANIES);

  const [deleteCompany] = useMutation(DELETE_PROPERTY, {
    refetchQueries: [GET_COMPANIES],
  });

  const deleteCompanyHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteCompany({
          variables: {
            id,
          },
        });
      }
    }
  };

  return (
    <div>
      <CompaniesTable
        companies={data?.companies}
        onDeleteCompany={deleteCompanyHandler}
      />
      <ReloadQuery reload={refetch} />
      <Space h="lg" />
      <Box w={'100%'}>
        <CompanyAdd />
      </Box>
    </div>
  );
}
