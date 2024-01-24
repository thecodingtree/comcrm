'use client';

import { trpc } from '@/app/_trpc/client';

import ContactsTable from '@/components/contact/ContactsTable';
import ContactAdd from '@/components/contact/ContactAdd';
import ReloadQuery from '../controls/ReloadQuery';

export default function ContactsPage() {
  const { data, refetch } = trpc.contact.getContacts.useQuery();

  const deleteContact = trpc.contact.deleteContact.useMutation({
    onSuccess: () => refetch,
  });

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
      <div className="min-h-4" />
      <ContactAdd onAdded={() => refetch()} />
    </div>
  );
}
