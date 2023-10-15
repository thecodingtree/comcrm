'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_CONTACT } from '@/graphql/mutations';

import { GET_CONTACTS } from '@/graphql/queries';

import { Space } from '@mantine/core';

import ContactsTable from '@/components/contact/ContactsTable';
import ContactAdd from '@/components/contact/ContactAdd';

interface ContactsPageProps {
  user: any;
}

export default function CompaniesPage({ user }: ContactsPageProps) {
  const { data, error } = useSuspenseQuery(GET_CONTACTS, {
    variables: { filter: { user: user.id } },
  });

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_CONTACTS],
  });

  const deleteContactHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteContact({
          variables: {
            id,
          },
        });
      }
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactsTable
          contacts={data?.contacts}
          onDeleteContact={deleteContactHandler}
        />
      </Suspense>
      <Space h="lg" />
      <ContactAdd />
    </div>
  );
}
