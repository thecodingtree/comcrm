import { type CompanyFormValues } from './form/CompanyForm';
import {
  CompanyReservedAttributes,
  type CreateCompanyInputType,
} from '@/server/sharedTypes';

export const buildCompanyMutatePayload = ({
  values,
}: {
  values: CompanyFormValues;
}) => {
  const attributes = [];

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
