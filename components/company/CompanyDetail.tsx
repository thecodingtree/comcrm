'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_COMPANY } from '@/graphql/queries';

import { Text, Title, Space, Grid } from '@mantine/core';

import CompanyInfo from './CompanyInfo';
import CompanyProperties from './CompanyProperties';
import CompanyContacts from './CompanyContacts';
import CompanyNotes from './CompanyNotes';

export default function CompanyDetails() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_COMPANY, {
    variables: { id: params?.id },
  });

  return (
    <Grid>
      {/* <Grid.Col span={12}>
          <Title>{`Company: ${params?.id}`}</Title>
          <Text>{loading ? 'Loading....' : JSON.stringify(data)}</Text>
        </Grid.Col> */}
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <CompanyInfo
          name={data?.company?.name}
          address={data?.company?.address}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <CompanyNotes />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <CompanyContacts />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <CompanyProperties />
      </Grid.Col>
    </Grid>
  );
}
