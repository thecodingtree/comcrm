'use client';

import { Grid, NumberInput, TextInput } from '@mantine/core';

import { Button } from '@/components/ui/button';

import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Property Name is required' }),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  suite: z.string().optional(),
  size: z.number().optional(),
  price: z.number().optional(),
});

export type PropertyFormValues = z.infer<typeof schema>;

export default function PropertyForm({
  name,
  onSubmit,
  submitting,
}: {
  name?: string;
  onSubmit?: (values: PropertyFormValues) => void;
  submitting?: boolean;
}) {
  const handleSubmit = (values: PropertyFormValues) => {
    onSubmit && onSubmit(values);
  };

  const form = useForm({
    initialValues: {
      name: name || '',
      street: '',
      city: '',
      state: '',
      zip: '',
      suite: '',
      size: undefined,
      price: undefined,
    },
    validate: zodResolver(schema),
  });

  return (
    <div className="m-2">
      <h1>Quick Add: Property</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          id="name"
          name="name"
          label="Property Name"
          placeholder="Property Name"
          mt="lg"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              id="street"
              name="street"
              label="Street"
              mt="lg"
              placeholder="Street"
              {...form.getInputProps('street')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              id="city"
              name="city"
              label="City"
              placeholder="City"
              {...form.getInputProps('city')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              id="state"
              name="state"
              label="State"
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              id="zip"
              name="zip"
              label="Zip"
              placeholder="Zip"
              {...form.getInputProps('zip')}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          id="suite"
          name="suite"
          label="Suite"
          placeholder="Suite"
          mt="lg"
          {...form.getInputProps('suite')}
        />
        <NumberInput
          id="size"
          name="size"
          label="Size (sqft)"
          placeholder="Size (sqft)"
          mt="lg"
          allowLeadingZeros={false}
          allowNegative={false}
          decimalScale={0}
          hideControls
          {...form.getInputProps('size')}
        />
        <NumberInput
          id="price"
          name="price"
          label="Price"
          placeholder="Price"
          mt="lg"
          allowLeadingZeros={false}
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale={true}
          hideControls
          {...form.getInputProps('price')}
        />
        <div className="flex flex-col justify-center mt-2">
          <Button type="submit" disabled={submitting}>
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}
