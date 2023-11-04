'use client';

import { useParams } from 'next/navigation';

import { Space, Grid, Avatar } from '@mantine/core';

import { IconBuilding } from '@tabler/icons-react';

import PropertyInfo from './PropertyInfo';
import PropertyCompanies from './PropertyCompanies';
import PropertyContacts from './PropertyContacts';
import EntityNotes from '@/components/entities/EntityNotes';
import { trpc } from '@/app/_trpc/client';

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
        <EntityNotes entityId={propertyId} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <PropertyContacts />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <PropertyCompanies />
      </Grid.Col>
    </Grid>
  );
}
