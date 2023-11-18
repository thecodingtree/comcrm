'use client';
import {
  Paper,
  Title,
  Grid,
  NumberInput,
  TextInput,
  Button,
  Group,
} from '@mantine/core';

import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Company Name is required' }),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
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
      email: '',
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
    <Paper withBorder={false} m={4}>
      <Title>Quick Add: Company</Title>
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
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          mt="lg"
          {...form.getInputProps('email')}
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
        <Group justify="center" mt="md">
          <Button type="submit" disabled={submitting}>
            Add Company
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
