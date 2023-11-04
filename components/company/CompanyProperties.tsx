'use client';

import { useParams } from 'next/navigation';

import { Title } from '@mantine/core';

import { PropertyType } from '@/server/sharedTypes';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import PropertyAdd from '../property/PropertyAdd';

export default function CompanyProperties() {
  const params = useParams();

  const entityId = params?.id as string;

  const data: PropertyType[] = [];
  const isLoading = false;

  if (isLoading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Properties</Title>
        <LinkedEntitiesTable linkedEntities={data} />
        <PropertyAdd linkedEntity={entityId} />
      </div>
    )
  );
}
