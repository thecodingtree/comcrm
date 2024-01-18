'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

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

export default function EntityAddDialog({
  triggerLabel,
  defaultName,
  entityType,
  onAdded,
}: {
  triggerLabel?: string;
  defaultName?: string;
  entityType: CoreEntityType;
  onAdded?: (data: any) => void;
}) {
  const [opened, setOpened] = useState(false);

  const createCompany = trpc.company.createCompany.useMutation({
    onSettled: () => setOpened(false),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const createContact = trpc.contact.createContact.useMutation({
    onSettled: () => setOpened(false),
    onSuccess: (data) => onAdded && onAdded(data),
  });

  const createProperty = trpc.property.createProperty.useMutation({
    onSettled: () => setOpened(false),
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
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>{AddForm(defaultName)}</DialogContent>
    </Dialog>
  );
}
