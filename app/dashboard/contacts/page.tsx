import { getServerSession } from 'next-auth';

import ContactsPage from '@/components/contact/ContactsPage';

export default async function Contacts() {
  // TODO: don't love this but it works for now
  const session = await getServerSession();

  return <ContactsPage user={session?.user} />;
}
