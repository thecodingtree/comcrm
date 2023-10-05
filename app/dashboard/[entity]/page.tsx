import { Button } from '@mantine/core';
import { EntitiesTable } from '@/components/entities/EntitiesTable';

import {
  getCompaniesForUser,
  createCompany,
  getContactsForUser,
  getPropertiesForUser,
  EntityDataMapperResult,
} from '@/actions/entity';

export default async function EntityView({
  params,
}: {
  params: { entity: string };
}) {
  // TEST WITH COMPANY ENTITIES
  const entities = await getCompaniesForUser();

  return (
    <div>
      <h1>{`Entity View: ${params.entity}`}</h1>
      {/* <EntitiesTable entities={entities} /> */}
    </div>
  );
}
