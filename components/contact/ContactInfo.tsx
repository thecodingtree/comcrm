import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Stack, Title, Space, Paper, rem } from '@mantine/core';

import { EDIT_CONTACT } from '@/graphql/mutations';
import { GET_CONTACT } from '@/graphql/queries';
import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';

interface ContactCardProps {
  contactId?: string;
}

export default function ContactInfo({ contactId }: ContactCardProps) {
  const { data, loading, error } = useQuery(GET_CONTACT, {
    variables: { id: contactId },
  });

  const [updateContact] = useMutation(EDIT_CONTACT);

  const fullName = `${data?.contact?.name || ''} ${
    data?.contact?.surName || ''
  }`;

  const handleNameChange = (name?: string | null) => {
    if (!name) return;

    const [firstName, lastName] = name?.split(' ');
    updateContact({
      variables: {
        id: contactId,
        name: firstName,
        surName: lastName,
      },
    });
  };

  return (
    <Paper p="sm" maw={rem(500)}>
      <Stack gap="sm">
        <EditTitle initValue={fullName} onChange={handleNameChange} />
        <Space h="xs" />
        <EditText
          label="phone"
          initValue={data?.contact?.phone}
          onChange={(phone) =>
            updateContact({ variables: { id: contactId, phone } })
          }
        />

        <EditText
          label="email"
          initValue={data?.contact?.email}
          onChange={(email) =>
            updateContact({ variables: { id: contactId, email } })
          }
        />
        <EditAddress
          label="address"
          address={data?.contact?.address}
          onChange={(address) =>
            updateContact({
              variables: {
                id: contactId,
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
