import { Paper, Space, rem } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';
import EditAttribute from '../input/EditAttribute';

import { PropertyReservedAttributes } from '@/server/sharedTypes';

export default function PropertyInfo({ propertyId }: { propertyId?: string }) {
  const { data, isLoading } = trpc.property.getProperty.useQuery(propertyId);

  const updateProperty = trpc.property.updateProperty.useMutation();

  const updateOrCreateAttribute =
    trpc.attributes.updateOrCreateAttribute.useMutation();

  return (
    <Paper p="sm" maw={rem(500)}>
      <div className="flex flex-col gap-2">
        <EditTitle
          initValue={data?.name}
          onChange={(name) =>
            updateProperty.mutate({ id: propertyId!, name: name || undefined })
          }
        />
        <Space h="xs" />
        <EditAddress
          label="address"
          address={data?.address}
          onChange={(address) =>
            updateProperty.mutate({
              id: propertyId!,
              address: {
                street: address?.street,
                city: address?.city,
                state: address?.state,
                zip: address?.zip,
              },
            })
          }
        />
        <EditText
          label="phone"
          initValue={data?.phone}
          onChange={(phone) =>
            updateProperty.mutate({
              id: propertyId!,
              phone: phone || undefined,
            })
          }
        />

        <EditText
          label="email"
          initValue={data?.email}
          onChange={(email) =>
            updateProperty.mutate({
              id: propertyId!,
              email: email || undefined,
            })
          }
        />
        <EditAttribute
          label="suite"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === PropertyReservedAttributes.SUITE
          )}
          reservedName={PropertyReservedAttributes.SUITE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: propertyId!,
            });
          }}
        />
        <EditAttribute
          label="price"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === PropertyReservedAttributes.PRICE
          )}
          reservedName={PropertyReservedAttributes.PRICE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: propertyId!,
            });
          }}
        />
        <EditAttribute
          label="size"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === PropertyReservedAttributes.SIZE
          )}
          reservedName={PropertyReservedAttributes.SIZE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: propertyId!,
            });
          }}
        />
      </div>
    </Paper>
  );
}
