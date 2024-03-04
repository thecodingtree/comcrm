import { trpc } from '@/app/_trpc/client';

import { Card, CardContent } from '@/components/ui/card';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';
import EditAttribute from '../input/EditAttribute';
import { ContactReservedAttributes } from '@/server/sharedTypes';
import CustomAttributes from '../attributes/CustomAttributes';

export default function ContactInfo({
  contactId,
  readOnly = false,
}: {
  contactId?: string;
  readOnly?: boolean;
}) {
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
      <div>
        <Card>
          <CardContent>
            {readOnly ? (
              <h1>{fullName}</h1>
            ) : (
              <EditTitle initValue={fullName} onChange={handleNameChange} />
            )}
            {readOnly ? (
              <div>{data?.phone}</div>
            ) : (
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
            )}
            {readOnly ? (
              <div>{`${
                data?.attributes?.find(
                  (attr) => attr.name === ContactReservedAttributes.ALT_PHONE,
                )?.value ?? ''
              }`}</div>
            ) : (
              <EditAttribute
                label="alt phone"
                initAttr={data?.attributes?.find(
                  (attr) => attr.name === ContactReservedAttributes.ALT_PHONE,
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
            )}

            {readOnly ? (
              <div>{data?.email}</div>
            ) : (
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
            )}
            {readOnly ? (
              <div>{data?.address?.street}</div>
            ) : (
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
            )}
          </CardContent>
        </Card>
        <CustomAttributes entityId={contactId!} />
      </div>
    )
  );
}
