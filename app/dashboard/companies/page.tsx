import { getCompaniesForUser } from '@/actions/entity';

import CompaniesTable from '@/components/tables/CompaniesTable';

import { getClient } from '@/lib/client';

import { gql } from '@apollo/client';

const query = gql`
  query {
    companies {
      id
      name
    }
  }
`;

export default async function Companies() {
  const companies = await getCompaniesForUser();

  const { data } = await getClient().query({ query });

  return (
    <div>
      <h1>{'Companies!'}</h1>
      <div>{JSON.stringify(data)}</div>
      <CompaniesTable companies={companies} />
    </div>
  );
}
