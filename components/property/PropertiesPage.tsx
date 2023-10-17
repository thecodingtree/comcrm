'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_PROPERTY } from '@/graphql/mutations';

import { GET_PROPERTIES } from '@/graphql/queries';

import { Space } from '@mantine/core';

import PropertiesTable from '@/components/property/PropertiesTable';
import PropertyAdd from '@/components/property/PropertyAdd';
import ReloadQuery from '../controls/ReloadQuery';

export default function PropertiesPage() {
  const { data, loading, error, refetch } = useQuery(GET_PROPERTIES);

  const [deleteProperty] = useMutation(DELETE_PROPERTY, {
    refetchQueries: [GET_PROPERTIES],
  });

  const deletePropertyHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteProperty({
          variables: {
            id,
          },
        });
      }
    }
  };

  return (
    <div>
      <PropertiesTable
        properties={data?.properties}
        onDeleteProperty={deletePropertyHandler}
      />
      <ReloadQuery reload={refetch} />
      <Space h="lg" />
      <PropertyAdd />
    </div>
  );
}
