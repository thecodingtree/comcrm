import { useMutation } from '@apollo/client';
import { Stack, Space, Paper, rem } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';
import EditAttribute from '../input/EditAttribute';
import { ContactReservedAttributes } from '@/server/sharedTypes';

interface ContactCardProps {
  contactId?: string;
}

export default function ContactInfo({ contactId }: ContactCardProps) {
  const { data, isLoading } = trpc.contact.getContact.useQuery(contactId);

  const updateContact = trpc.contact.updateContact.useMutation();

  const updateOrCreateAttribute =
    trpc.attributes.updateOrCreateAttribute.useMutation();

  const fullName = `${data?.name || ''} ${data?.surName || ''}`;

  const handleNameChange = (name?: string | null) => {
    if (!name) return;

    const [firstName, lastName] = name?.split(' ');
    updateContact.mutate({
      id: contactId!,
      name: firstName,
      surName: lastName,
    });
  };

  return (
    !isLoading && (
      <Paper p="sm" maw={rem(500)}>
        <Stack gap="sm">
          <EditTitle initValue={fullName} onChange={handleNameChange} />
          <Space h="xs" />
          <EditText
            label="phone"
            initValue={data?.phone}
            onChange={(phone) =>
              updateContact.mutate({
                id: contactId!,
                phone: phone || undefined,
              })
            }
          />
          <EditAttribute
            label="alt phone"
            initAttr={data?.attributes?.find(
              (attr) => attr.name === ContactReservedAttributes.ALT_PHONE
            )}
            reservedName={ContactReservedAttributes.ALT_PHONE}
            onChange={(attr) => {
              updateOrCreateAttribute.mutate({
                id: attr?.id,
                name: attr?.name!,
                value: attr?.value!,
                entityId: contactId!,
              });
            }}
          />

          <EditText
            label="email"
            initValue={data?.email}
            onChange={(email) =>
              updateContact.mutate({
                id: contactId!,
                email: email || undefined,
              })
            }
          />
          <EditAddress
            label="address"
            address={data?.address}
            onChange={(address) =>
              updateContact.mutate({
                id: contactId!,
                address: {
                  street: address?.street,
                  city: address?.city,
                  state: address?.state,
                  zip: address?.zip,
                },
              })
            }
          />
        </Stack>
      </Paper>
    )
  );
}
