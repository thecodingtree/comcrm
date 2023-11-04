'use client';

import { useParams } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import CompanyAdd from '@/components/company/CompanyAdd';

export default function PropertyCompanies() {
  const params = useParams();

  const entityId = params?.id as string;

  const data = null;
  const loading = false;

  if (loading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Companies</Title>
        <LinkedEntitiesTable linkedEntities={data} />
        <CompanyAdd linkedEntity={entityId} />
      </div>
    )
  );
}
