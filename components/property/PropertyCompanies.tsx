'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import { GET_COMPANIES } from '@/graphql/queries';

export default function PropertyCompanies() {
  const params = useParams();
  const session = useSession();
  const { data, loading, error } = useQuery(GET_COMPANIES, {
    variables: {
      filter: { entity: params?.id as string },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Companies</Title>
        <LinkedEntitiesTable linkedEntities={data?.companies} />
      </div>
    )
  );
}
