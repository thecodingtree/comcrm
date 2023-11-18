import { CompanyFormValues } from './form/CompanyForm';
import { CompanyReservedAttributes } from '@/server/sharedTypes';
import { CreateCompanyInputType } from '@/server/api/routers/company';

export const buildCompanyMutatePayload = ({
  values,
}: {
  values: CompanyFormValues;
}) => {
  let attributes = [];

  if (values.website) {
    attributes.push({
      name: CompanyReservedAttributes.WEBSITE,
      value: values.website,
    });
  }

  if (values.size) {
    attributes.push({
      name: CompanyReservedAttributes.SIZE,
      value: values.size.toString(),
    });
  }

  return {
    name: values.name,
    phone: values.phone,
    address: {
      street: values.street,
      city: values.city,
      state: values.state,
      zip: values.zip,
    },
    attributes,
  } satisfies CreateCompanyInputType;
};
