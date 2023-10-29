'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_COMPANY } from '@/graphql/queries';

import { Avatar, Space, Grid } from '@mantine/core';

import CompanyInfo from './CompanyInfo';
import CompanyProperties from './CompanyProperties';
import CompanyContacts from './CompanyContacts';
import EntityNotes from '@/components/entities/EntityNotes';

export default function CompanyDetails() {
  const params = useParams();

  const companyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, loading, error } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
  });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar
          color="blue"
          radius="xl"
          size={150}
          src={data?.company?.image}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <CompanyInfo companyId={companyId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <EntityNotes entityId={companyId} />
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
