import { Paper, Space, rem } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import EditText from '@/components/input/EditText';
import EditTitle from '@/components/input/EditTitle';
import EditAddress from '../input/EditAddress';
import EditAttribute from '../input/EditAttribute';
import { CompanyReservedAttributes } from '@/server/sharedTypes';

interface CompanyCardProps {
  companyId?: string;
}

export default function CompanyInfo({ companyId }: CompanyCardProps) {
  const { data, isLoading } = trpc.company.getCompany.useQuery(companyId);

  const updateCompany = trpc.company.updateCompany.useMutation();

  const updateOrCreateAttribute =
    trpc.attributes.updateOrCreateAttribute.useMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Paper p="sm" maw={rem(600)}>
      <div className="flex flex-col items-start gap-2">
        {data?.name && (
          <EditTitle
            initValue={data?.name}
            onChange={(name) =>
              updateCompany.mutate({ id: companyId!, name: name || undefined })
            }
          />
        )}
        <Space h="xs" />
        <EditText
          label="phone"
          initValue={data?.phone}
          onChange={(phone) =>
            updateCompany.mutate({ id: companyId!, phone: phone || undefined })
          }
        />
        <EditAttribute
          label="alt phone"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === CompanyReservedAttributes.ALT_PHONE
          )}
          reservedName={CompanyReservedAttributes.ALT_PHONE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: companyId!,
            });
          }}
        />
        <EditText
          label="email"
          initValue={data?.email}
          onChange={(email) =>
            updateCompany.mutate({ id: companyId!, email: email || undefined })
          }
        />
        <EditAttribute
          label="alt email"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === CompanyReservedAttributes.ALT_EMAIL
          )}
          reservedName={CompanyReservedAttributes.ALT_EMAIL}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: companyId!,
            });
          }}
        />
        <EditAttribute
          label="website"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === CompanyReservedAttributes.WEBSITE
          )}
          reservedName={CompanyReservedAttributes.WEBSITE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: companyId!,
            });
          }}
        />
        <EditAttribute
          label="size"
          initAttr={data?.attributes?.find(
            (attr) => attr.name === CompanyReservedAttributes.SIZE
          )}
          reservedName={CompanyReservedAttributes.SIZE}
          onChange={(attr) => {
            updateOrCreateAttribute.mutate({
              id: attr?.id,
              name: attr?.name!,
              value: attr?.value!,
              entityId: companyId!,
            });
          }}
        />
        <EditAddress
          label="address"
          address={data?.address}
          onChange={(address) =>
            updateCompany.mutate({
              id: companyId!,
              address: {
                street: address?.street,
                city: address?.city,
                state: address?.state,
                zip: address?.zip,
              },
            })
          }
        />
      </div>
    </Paper>
  );
}
