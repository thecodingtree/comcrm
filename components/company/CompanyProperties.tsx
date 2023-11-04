'use client';

import { useParams } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import PropertyAdd from '../property/PropertyAdd';

export default function CompanyProperties() {
  const params = useParams();
  const entityId = params?.id as string;

  const { data, isLoading, refetch } = trpc.property.getProperties.useQuery({
    filter: { id: entityId },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Properties</Title>
        <LinkedEntitiesTable linkedEntities={data} />
        <PropertyAdd linkedEntity={entityId} onAdd={refetch} />
      </div>
    )
  );
}
