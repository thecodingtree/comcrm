'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_CONTACT } from '@/graphql/queries';

import { Grid } from '@mantine/core';

import ContactInfo from './ContactInfo';
import ContactNotes from './ContactNotes';

export default function ContactDetails() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_CONTACT, {
    variables: { id: params?.id },
  });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <ContactInfo
          name={data?.contact?.name}
          surName={data?.contact?.surName}
          address={data?.contact?.address}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <ContactNotes />
      </Grid.Col>
    </Grid>
  );
}
