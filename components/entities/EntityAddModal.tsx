'use client';

import { Modal } from '@mantine/core';

import { CompanyFormValues } from '@/components/company/form/CompanyForm';
import CompanyForm from '@/components/company/form/CompanyForm';
import { buildCompanyMutatePayload } from '@/components/company/utils';

import { ContactFormValues } from '@/components/contact/form/ContactForm';
import ContactForm from '@/components/contact/form/ContactForm';
import { buildContactMutatePayload } from '@/components/contact/utils';

import { PropertyFormValues } from '@/components/property/form/PropertyForm';
import PropertyForm from '@/components/property/form/PropertyForm';
import { buildPropertyMutatePayload } from '@/components/property/utils';

import { trpc } from '@/app/_trpc/client';
import { CoreEntityType } from '@prisma/client';

export default function EntityAddModal({
  name,
  entityType,
  opened = false,
  close,
  onAdded,
}: {
  name?: string;
  entityType: CoreEntityType;
  opened?: boolean;
  close: () => void;
  onAdded?: (data: any) => void;
}) {
  const createCompany = trpc.company.createCompany.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const createContact = trpc.contact.createContact.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const createProperty = trpc.property.createProperty.useMutation({
    onSettled: () => close(),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const AddForm = (name?: string) => {
    if (entityType === CoreEntityType.COMPANY) {
      return (
        <CompanyForm
          name={name}
          onSubmit={(values: CompanyFormValues) =>
            createCompany.mutate(buildCompanyMutatePayload({ values }))
          }
          submitting={createCompany.isLoading}
        />
      );
    } else if (entityType === CoreEntityType.CONTACT) {
      return (
        <ContactForm
          name={name}
          onSubmit={(values: ContactFormValues) =>
            createContact.mutate(buildContactMutatePayload({ values }))
          }
          submitting={createContact.isLoading}
        />
      );
    } else if (entityType === CoreEntityType.PROPERTY) {
      return (
        <PropertyForm
          name={name}
          onSubmit={(values: PropertyFormValues) =>
            createProperty.mutate(buildPropertyMutatePayload({ values }))
          }
          submitting={createProperty.isLoading}
        />
      );
    } else null;
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      centered
      closeOnClickOutside={false}
    >
      {AddForm(name)}
    </Modal>
  );
}
