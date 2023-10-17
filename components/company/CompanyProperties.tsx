'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import { GET_PROPERTIES } from '@/graphql/queries';
import PropertyAdd from '../property/PropertyAdd';

export default function CompanyProperties() {
  const params = useParams();

  const entityId = params?.id as string;

  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: {
      filter: { entity: params?.id as string },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Properties</Title>
        <LinkedEntitiesTable linkedEntities={data?.properties} />
        <PropertyAdd linkedEntity={entityId} />
      </div>
    )
  );
}
