import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Address } from '@/generated/resolvers-types';
import {
  Group,
  Box,
  Paper,
  Stack,
  Title,
  Text,
  Space,
  rem,
} from '@mantine/core';

import { EDIT_COMPANY } from '@/graphql/mutations';
import { GET_COMPANY } from '@/graphql/queries';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';

interface CompanyCardProps {
  companyId?: string;
}

export default function CompanyInfo({ companyId }: CompanyCardProps) {
  const { data, loading, error } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
  });

  const [updateCompany] = useMutation(EDIT_COMPANY);

  if (loading) return <p>Loading...</p>;

  return (
    <Paper p="sm" maw={rem(600)}>
      <Stack gap="sm">
        {data?.company?.name && (
          <EditTitle
            initValue={data?.company?.name}
            onChange={(name) =>
              updateCompany({ variables: { id: companyId, name } })
            }
          />
        )}
        <Space h="xs" />
        <EditText
          label="phone"
          initValue={data?.company?.phone}
          onChange={(phone) =>
            updateCompany({ variables: { id: companyId, phone } })
          }
        />
        <EditText
          label="email"
          initValue={data?.company?.email}
          onChange={(email) =>
            updateCompany({ variables: { id: companyId, email } })
          }
        />
        <EditAddress
          label="address"
          address={data?.company?.address}
          onChange={(address) =>
            updateCompany({
              variables: {
                id: companyId,
                address: {
                  street: address?.street,
                  city: address?.city,
                  state: address?.state,
                  zip: address?.zip,
                },
              },
            })
          }
        />
      </Stack>
    </Paper>
  );
}
