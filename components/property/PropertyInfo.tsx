import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Paper, Stack, Text, Space, rem } from '@mantine/core';

import { GET_PROPERTY } from '@/graphql/queries';
import { EDIT_PROPERTY } from '@/graphql/mutations';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';

interface PropertyInfoProps {
  propertyId?: string;
}

export default function PropertyInfo({ propertyId }: PropertyInfoProps) {
  const { data, loading, error } = useQuery(GET_PROPERTY, {
    variables: { id: propertyId },
  });

  const [updateProperty] = useMutation(EDIT_PROPERTY);

  return (
    <Paper p="sm" maw={rem(500)}>
      <Stack gap="sm">
        <EditTitle
          initValue={data?.property?.name}
          onChange={(name) =>
            updateProperty({ variables: { id: propertyId, name } })
          }
        />
        <Space h="xs" />
        <EditText
          label="phone"
          initValue={data?.property?.phone}
          onChange={(phone) =>
            updateProperty({ variables: { id: propertyId, phone } })
          }
        />

        <EditText
          label="email"
          initValue={data?.property?.email}
          onChange={(email) =>
            updateProperty({ variables: { id: propertyId, email } })
          }
        />
        <EditAddress
          label="address"
          address={data?.property?.address}
          onChange={(address) =>
            updateProperty({
              variables: {
                id: propertyId,
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
