'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { Title } from '@mantine/core';

import LinkedEntitiesTable from '@/components/tables/LinkedEntitiesTable';
import CompanyAdd from '@/components/company/CompanyAdd';

import { GET_COMPANIES } from '@/graphql/queries';

export default function PropertyCompanies() {
  const params = useParams();

  const entityId = params?.id as string;

  const { data, loading, error } = useQuery(GET_COMPANIES, {
    variables: {
      filter: { entity: entityId },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    data && (
      <div>
        <Title>Companies</Title>
        <LinkedEntitiesTable linkedEntities={data?.companies} />
        <CompanyAdd linkedEntity={entityId} />
      </div>
    )
  );
}
