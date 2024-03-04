import { trpc } from '@/app/_trpc/client';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';
import EditAttribute from '../input/EditAttribute';

import { PropertyReservedAttributes } from '@/server/sharedTypes';
import CustomAttributes from '../attributes/CustomAttributes';

export default function PropertyInfo({
  propertyId,
  readOnly = false,
}: {
  propertyId?: string;
  readOnly?: boolean;
}) {
  const { data, isLoading } = trpc.property.getProperty.useQuery(propertyId);

  const updateProperty = trpc.property.updateProperty.useMutation();

  const updateOrCreateAttribute =
    trpc.attributes.updateOrCreateAttribute.useMutation();

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2">
        {readOnly ? (
          <div>{data?.name}</div>
        ) : (
          <EditTitle
            initValue={data?.name}
            onChange={(name) =>
              updateProperty.mutate({
                id: propertyId!,
                name: name || undefined,
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
        )}
        {readOnly ? (
          <div>{data?.phone}</div>
        ) : (
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
        )}

        {readOnly ? (
          <div>{data?.email}</div>
        ) : (
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
        )}
        {readOnly ? (
          <div>{`${
            data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.SUITE,
            )?.value ?? ''
          }`}</div>
        ) : (
          <EditAttribute
            label="suite"
            initAttr={data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.SUITE,
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
        )}
        {readOnly ? (
          <div>{`${
            data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.PRICE,
            )?.value ?? ''
          }`}</div>
        ) : (
          <EditAttribute
            label="price"
            initAttr={data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.PRICE,
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
        )}
        {readOnly ? (
          <div>{`${
            data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.SIZE,
            )?.value ?? ''
          }`}</div>
        ) : (
          <EditAttribute
            label="size"
            initAttr={data?.attributes?.find(
              (attr) => attr.name === PropertyReservedAttributes.SIZE,
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
        )}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {propertyId && <CustomAttributes entityId={propertyId} />}
      </div>
    </div>
  );
}
