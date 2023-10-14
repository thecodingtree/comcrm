'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_COMPANY, GET_PROPERTY } from '@/graphql/queries';

import { Text, Title, Space, Grid } from '@mantine/core';

import PropertyInfo from './PropertyInfo';
import PropertyCompanies from './PropertyCompanies';
import PropertyContacts from './PropertyContacts';
import PropertyNotes from './PropertyNotes';

export default function PropertyDetail() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_PROPERTY, {
    variables: { id: params?.id },
  });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <PropertyInfo
          name={data?.property?.name}
          address={data?.property?.address}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <PropertyNotes />
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
