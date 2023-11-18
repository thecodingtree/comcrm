'use client';

import { useParams } from 'next/navigation';

import { Grid, Avatar, Text } from '@mantine/core';

import { RelationshipsTable } from '@/components/tables/RelationshipsTable';

import ContactInfo from './ContactInfo';
import EntityNotes from '@/components/entities/EntityNotes';
import { trpc } from '@/app/_trpc/client';
import { CoreEntityType } from '@prisma/client';

export default function ContactDetails() {
  const params = useParams();

  const contactId = typeof params?.id === 'string' ? params?.id : undefined;

  const getContact = trpc.contact.getContact.useQuery(contactId);

  if (getContact.isLoading) return <p>Loading...</p>;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar
          color="blue"
          radius="xl"
          size={150}
          src={getContact.data?.image}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <ContactInfo contactId={contactId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <EntityNotes entityId={contactId} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Text size="lg">Relationships</Text>
        <RelationshipsTable
          fromEntityId={contactId!}
          fromEntityType={CoreEntityType.CONTACT}
        />
      </Grid.Col>
    </Grid>
  );
}
