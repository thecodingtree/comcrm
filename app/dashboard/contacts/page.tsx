import { getServerSession } from 'next-auth';

import ContactsPage from '@/components/contact/ContactsPage';

export default async function Contacts() {
  return <ContactsPage />;
}
