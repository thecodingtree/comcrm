'use client';

import { useParams } from 'next/navigation';

import { Space, Grid, Avatar } from '@mantine/core';

import { CoreEntityType } from '@prisma/client';

import { IconBuilding } from '@tabler/icons-react';

import PropertyInfo from './PropertyInfo';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import { trpc } from '@/app/_trpc/client';
import EntityNotesTable from '@/components/entities/EntityNotesTable';

export default function PropertyDetail() {
  const params = useParams();

  const propertyId = typeof params?.id === 'string' ? params?.id : undefined;

  const getProperty = trpc.property.getProperty.useQuery(propertyId);

  if (getProperty.isLoading) return <p>Loading...</p>;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar
          color="blue"
          radius="xl"
          size={150}
          src={getProperty.data?.image}
        >
          <IconBuilding size={75} />
        </Avatar>
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <PropertyInfo propertyId={propertyId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <EntityNotesBrief entityId={propertyId} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <RelationshipsTable
          fromEntityId={propertyId!}
          fromEntityType={CoreEntityType.PROPERTY}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <EntityNotesTable entity={propertyId!} />
      </Grid.Col>
    </Grid>
  );
}
