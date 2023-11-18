'use client';

import { Space } from '@mantine/core';

import PropertiesTable from '@/components/property/PropertiesTable';
import PropertyAdd from '@/components/property/PropertyAdd';
import ReloadQuery from '../controls/ReloadQuery';
import { trpc } from '@/app/_trpc/client';

export default function PropertiesPage() {
  const { data, refetch } = trpc.property.getProperties.useQuery();

  const deleteProperty = trpc.property.deleteProperty.useMutation();

  const deletePropertyHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteProperty.mutate(id);
      }
    }
  };

  return (
    <div>
      <PropertiesTable
        properties={data}
        onDeleteProperty={deletePropertyHandler}
      />
      <ReloadQuery reload={refetch} />
      <Space h="lg" />
      <PropertyAdd onAdded={() => refetch()} />
    </div>
  );
}
