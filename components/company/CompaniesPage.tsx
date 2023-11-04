'use client';

import { Space, Box } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import CompaniesTable from '@/components/company/CompaniesTable';
import CompanyAdd from '@/components/company/CompanyAdd';
import ReloadQuery from '@/components/controls/ReloadQuery';

export default function CompaniesPage() {
  const { data, refetch } = trpc.company.getCompanies.useQuery();

  const deleteCompany = trpc.company.deleteCompany.useMutation({
    onSuccess: () => refetch,
  });

  const deleteCompanyHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteCompany.mutate(id);
      }
    }
  };

  return (
    <div>
      <CompaniesTable companies={data} onDeleteCompany={deleteCompanyHandler} />
      <ReloadQuery reload={refetch} />
      <Space h="lg" />
      <Box w={'100%'}>
        <CompanyAdd onAdd={refetch} />
      </Box>
    </div>
  );
}
