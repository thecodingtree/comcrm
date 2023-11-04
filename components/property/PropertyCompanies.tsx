'use client';

import { useParams } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import CompanyAdd from '@/components/company/CompanyAdd';

export default function PropertyCompanies() {
  const params = useParams();
  const entityId = params?.id as string;

  const { data, isLoading, refetch } = trpc.company.getCompanies.useQuery({
    filter: { id: entityId },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Companies</Title>
        <LinkedEntitiesTable linkedEntities={data} />
        <CompanyAdd linkedEntity={entityId} onAdd={refetch} />
      </div>
    )
  );
}
