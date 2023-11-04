'use client';
import { CreateContactInputType } from '@/server/api/routers/contact';
import { ContactReservedAttributes } from '@/server/sharedTypes';
import { Paper, Title, TextInput, Button, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'First Name is required' }),
  surName: z.string().min(1, { message: 'Last Name is required' }),
  phone: z.string().optional(),
  alt_phone: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof schema>;

const normalizeValues = (values: ContactFormValues) => {
  const { name, surName, phone, alt_phone, email } = values;

  return {
    name,
    surName,
    phone: phone || undefined,
    alt_phone: alt_phone || undefined,
    email: email || undefined,
  };
};

export default function ContactForm({
  onSubmit,
  submitting,
}: {
  onSubmit?: (values: ContactFormValues) => void;
  submitting?: boolean;
}) {
  const handleSubmit = (values: ContactFormValues) => {
    onSubmit && onSubmit(normalizeValues(values));
  };

  const form = useForm({
    initialValues: {
      name: '',
      surName: '',
      phone: '',
      alt_phone: '',
      email: '',
    },
    validate: zodResolver(schema),
  });

  return (
    <Paper withBorder={false} m={4}>
      <Title>Quick Add: Contact</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          id="name"
          name="name"
          label="First Name"
          placeholder="First Name"
          mt="lg"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          id="surName"
          name="surName"
          label="Last Name"
          placeholder="Last Name"
          mt="lg"
          withAsterisk
          {...form.getInputProps('surName')}
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
          id="alt_phone"
          name="alt_phone"
          label="Alt Phone"
          placeholder="Alt Phone"
          mt="lg"
          {...form.getInputProps('alt_phone')}
        />
        <TextInput
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          mt="lg"
          {...form.getInputProps('email')}
        />
        <Group justify="center" mt="md">
          <Button type="submit" disabled={submitting}>
            Add Contact
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
