'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';

import { Grid } from '@mantine/core';

import { GET_CONTACTS } from '@/graphql/queries';

import ContactCard from '@/components/cards/ContactCard';
import { Contact } from '@/generated/resolvers-types';

export default function CompanyContacts() {
  const params = useParams();
  const session = useSession();
  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: {
      filter: { user: session?.data?.user?.id, entity: params?.id as string },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Grid>
      <Grid.Col span={12}>
        {data?.contacts?.map((contact: Contact) => {
          const contact_title =
            contact?.attributes?.find((attr) => attr?.name === 'COMPANY_TITLE')
              ?.value || '';

          return (
            <ContactCard
              key={contact.id}
              name={`${contact.name} ${contact.surName}`}
              title={contact_title}
              email={contact.email || ''}
              phone={contact.phone || ''}
              image={contact.image || ''}
            />
          );
        })}
      </Grid.Col>
    </Grid>
  );
}
