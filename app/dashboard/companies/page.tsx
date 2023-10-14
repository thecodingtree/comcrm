import { getServerSession } from 'next-auth';

import CompanyPage from '@/components/company/CompaniesPage';

export default async function Companies() {
  // TODO: don't love this but it works for now
  const session = await getServerSession();

  return <CompanyPage user={session?.user} />;
}
