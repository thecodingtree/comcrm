import Link from 'next/link';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getClient } from '@/lib/client';
import { GET_COMPANIES_FOR_USER } from '@/graphql/queries';

import CompaniesTable from '@/components/tables/CompaniesTable';

export default async function Companies() {
  const session = await getServerSession(authOptions);
  const { data, loading, error } = await getClient().query({
    query: GET_COMPANIES_FOR_USER,
    variables: { user: session?.user?.id },
  });

  return (
    <div>
      <h1>{'Companies!'}</h1>
      <Link href="/dashboard/companies/new">{'Add New'}</Link>
      <CompaniesTable companies={data.companies} />
    </div>
  );
}
