import { getServerSession } from 'next-auth/next';

import PropertyPage from '@/components/property/PropertiesPage';

export default async function Properties() {
  // TODO: don't love this but it works for now
  const session = await getServerSession();

  return <PropertyPage user={session?.user} />;
}
