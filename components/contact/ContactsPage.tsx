'use client';

import { Suspense } from 'react';

import { useMutation } from '@apollo/client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { DELETE_CONTACT } from '@/graphql/mutations';

import { GET_CONTACTS } from '@/graphql/queries';

import { Space } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import ContactsTable from '@/components/contact/ContactsTable';
import ContactAdd from '@/components/contact/ContactAdd';
import ReloadQuery from '../controls/ReloadQuery';

export default function ContactsPage() {
  const { data, isLoading, refetch } = trpc.contact.getContacts.useQuery();

  const deleteContact = trpc.contact.deleteContact.useMutation();

  const deleteContactHandler = (id: string) => {
    {
      const answerYes = confirm('Are you sure?');

      if (answerYes) {
        deleteContact.mutate(id);
      }
    }
  };

  return (
    <div>
      <ContactsTable contacts={data} onDeleteContact={deleteContactHandler} />
      <ReloadQuery reload={refetch} />
      <Space h="lg" />
      <ContactAdd />
    </div>
  );
}
