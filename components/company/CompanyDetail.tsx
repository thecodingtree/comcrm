'use client';

import { useParams } from 'next/navigation';

import { Avatar, Space, Grid } from '@mantine/core';

import { CoreEntityType } from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import CompanyInfo from './CompanyInfo';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import EntitiyNotesTable from '../entities/EntityNotesTable';

export default function CompanyDetails() {
  const params = useParams();

  const companyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading } = trpc.company.getCompany.useQuery(companyId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar color="blue" radius="xl" size={150} src={data?.image} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <CompanyInfo companyId={companyId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <EntityNotesBrief entityId={companyId} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <Space h="md" />
      </Grid.Col>
      <Grid.Col span={12}>
        <RelationshipsTable
          fromEntityId={companyId!}
          fromEntityType={CoreEntityType.COMPANY}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <EntitiyNotesTable entity={companyId!} />
      </Grid.Col>
    </Grid>
  );
}
