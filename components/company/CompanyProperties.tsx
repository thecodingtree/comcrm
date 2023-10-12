'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import { GET_PROPERTIES } from '@/graphql/queries';

export default function CompanyProperties() {
  const params = useParams();
  const session = useSession();
  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: {
      filter: { user: session?.data?.user?.id, entity: params?.id },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Properties</Title>
        <LinkedEntitiesTable linkedEntities={data?.properties} />
      </div>
    )
  );
}
