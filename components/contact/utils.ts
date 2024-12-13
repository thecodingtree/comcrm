import { type ContactFormValues } from './form/ContactForm';
import {
  ContactReservedAttributes,
  type CreateContactInputType,
} from '@/server/sharedTypes';

export function buildContactMutatePayload({
  values,
}: {
  values: ContactFormValues;
}) {
  let attributes = undefined;

  if (values.alt_phone) {
    attributes = [
      {
        name: ContactReservedAttributes.ALT_PHONE,
        value: values.alt_phone,
      },
    ];
  }

  return {
    name: values.name,
    surName: values.surName,
    phone: values.phone,
    email: values.email,
    attributes,
  } satisfies CreateContactInputType;
}
