'use client';

import { Space } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import ContactsTable from '@/components/contact/ContactsTable';
import ContactAdd from '@/components/contact/ContactAdd';
import ReloadQuery from '../controls/ReloadQuery';

export default function ContactsPage() {
  const { data, refetch } = trpc.contact.getContacts.useQuery();

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
