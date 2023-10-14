'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_PROPERTY } from '@/graphql/mutations';

import { GET_PROPERTIES } from '@/graphql/queries';

import { Space } from '@mantine/core';

import PropertiesTable from '@/components/property/PropertiesTable';
import PropertyAdd from '@/components/property/PropertyAdd';

interface PropertiesPageProps {
  user: any;
}

export default function PropertiesPage({ user }: PropertiesPageProps) {
  const { data, error } = useSuspenseQuery(GET_PROPERTIES, {
    variables: { filter: { user: user.id } },
  });

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
      <Suspense fallback={<div>Loading...</div>}>
        <PropertiesTable
          properties={data?.properties}
          onDeleteProperty={deletePropertyHandler}
        />
      </Suspense>
      <Space h="lg" />
      <PropertyAdd />
    </div>
  );
}
