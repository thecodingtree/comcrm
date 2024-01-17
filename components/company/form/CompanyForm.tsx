'use client';
import { NumberInput, TextInput } from '@mantine/core';

import { Button } from '@/components/ui/button';

import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Company Name is required' }),
  phone: z.string().optional(),
  website: z.string().optional(),
  size: z.number().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof schema>;

export default function CompaniesForm({
  name,
  onSubmit,
  submitting,
}: {
  name?: string;
  onSubmit?: (values: CompanyFormValues) => void;
  submitting?: boolean;
}) {
  const handleSubmit = (values: any) => {
    onSubmit && onSubmit(values);
  };

  const form = useForm({
    initialValues: {
      name: name || '',
      phone: '',
      website: '',
      size: undefined,
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    validate: zodResolver(schema),
  });

  return (
    <div className="m-2">
      <h1>Quick Add: Company</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          mt="lg"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          id="phone"
          name="phone"
          label="Phone"
          placeholder="Phone"
          mt="lg"
          {...form.getInputProps('phone')}
        />
        <TextInput
          id="website"
          name="website"
          label="Website"
          placeholder="Website"
          mt="lg"
          {...form.getInputProps('website')}
        />
        <NumberInput
          id="size"
          name="size"
          label="Employees"
          placeholder="Number of Employees"
          mt="lg"
          allowLeadingZeros={false}
          allowNegative={false}
          allowDecimal={false}
          hideControls
          {...form.getInputProps('size')}
        />
        <div className="grid grid-cols-1">
          <div>
            <TextInput
              id="street"
              name="street"
              label="Street"
              mt="lg"
              placeholder="Street"
              {...form.getInputProps('street')}
            />
          </div>
          <div>
            <TextInput
              id="city"
              name="city"
              label="City"
              placeholder="City"
              {...form.getInputProps('city')}
            />
          </div>
          <div>
            <TextInput
              id="state"
              name="state"
              label="State"
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </div>
          <div>
            <TextInput
              id="zip"
              name="zip"
              label="Zip"
              placeholder="Zip"
              {...form.getInputProps('zip')}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center mt-2">
          <Button type="submit" disabled={submitting}>
            Add Company
          </Button>
        </div>
      </form>
    </div>
  );
}
