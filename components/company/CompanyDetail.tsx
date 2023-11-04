'use client';

import { useParams } from 'next/navigation';

import { Avatar, Space, Grid } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import CompanyInfo from './CompanyInfo';
import CompanyProperties from './CompanyProperties';
import CompanyContacts from './CompanyContacts';
import EntityNotes from '@/components/entities/EntityNotes';

export default function CompanyDetails() {
  const params = useParams();

  const companyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading } = trpc.company.getCompany.useQuery(companyId);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar color="blue" radius="xl" size={150} src={data?.image} />
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
