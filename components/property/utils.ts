import { PropertyFormValues } from './form/PropertyForm';
import { PropertyReservedAttributes } from '@/server/sharedTypes';
import { CreatePropertyInputType } from '@/server/api/routers/property';

export function buildPropertyMutatePayload({
  values,
}: {
  values: PropertyFormValues;
}) {
  const attributes = [];

  if (values.suite) {
    attributes.push({
      name: PropertyReservedAttributes.SUITE,
      value: values.suite,
    });
  }

  if (values.size) {
    attributes.push({
      name: PropertyReservedAttributes.SIZE,
      value: values.size.toString(),
    });
  }

  if (values.price) {
    attributes.push({
      name: PropertyReservedAttributes.PRICE,
      value: values.price.toString(),
    });
  }

  return {
    name: values.name,
    address: {
      street: values.street,
      city: values.city,
      state: values.state,
      zip: values.zip,
    },
    attributes,
  } satisfies CreatePropertyInputType;
}
