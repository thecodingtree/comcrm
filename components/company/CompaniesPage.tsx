'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_PROPERTY } from '@/graphql/mutations';

import { GET_COMPANIES } from '@/graphql/queries';

import { Space } from '@mantine/core';

import CompaniesTable from '@/components/company/CompaniesTable';
import CompanyAdd from '@/components/company/CompanyAdd';

interface CompaniesPageProps {
  user: any;
}

export default function CompaniesPage({ user }: CompaniesPageProps) {
  const { data, error } = useSuspenseQuery(GET_COMPANIES);

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
      <Suspense fallback={<div>Loading...</div>}>
        <CompaniesTable
          companies={data?.companies}
          onDeleteCompany={deleteCompanyHandler}
        />
      </Suspense>
      <Space h="lg" />
      <CompanyAdd />
    </div>
  );
}
