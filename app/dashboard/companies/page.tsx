import { getCompaniesForUser } from '@/actions/entity';

import CompaniesTable from '@/components/tables/CompaniesTable';

export default async function Companies() {
  const companies = await getCompaniesForUser();

  return (
    <div>
      <h1>{'Companies!'}</h1>
      <CompaniesTable companies={companies} />
    </div>
  );
}
