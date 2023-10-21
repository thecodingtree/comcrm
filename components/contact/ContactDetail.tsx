'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_CONTACT } from '@/graphql/queries';

import { Grid, Avatar } from '@mantine/core';

import ContactInfo from './ContactInfo';
import ContactNotes from './ContactNotes';

export default function ContactDetails() {
  const params = useParams();

  const contactId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, loading, error } = useQuery(GET_CONTACT, {
    variables: { id: contactId },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <Avatar
          color="blue"
          radius="xl"
          size={150}
          src={data?.contact?.image}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <ContactInfo contactId={contactId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <ContactNotes />
      </Grid.Col>
    </Grid>
  );
}
