'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_PROPERTY } from '@/graphql/queries';

import { Space, Grid, Avatar } from '@mantine/core';

import { IconBuilding } from '@tabler/icons-react';

import useUser from '@/hooks/useUser';

import PropertyInfo from './PropertyInfo';
import PropertyCompanies from './PropertyCompanies';
import PropertyContacts from './PropertyContacts';
import EntityNotes from '@/components/entities/EntityNotes';

export default function PropertyDetail() {
  const params = useParams();

  const propertyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, loading, error } = useQuery(GET_PROPERTY, {
    variables: { id: propertyId },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar color="blue" radius="xl" size={150} src={data?.property?.image}>
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
