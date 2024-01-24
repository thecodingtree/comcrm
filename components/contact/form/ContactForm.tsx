'use client';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

export default function ContactForm({
  name,
  onSubmit,
  submitting,
}: {
  name?: string;
  onSubmit: (values: ContactFormValues) => void;
  submitting?: boolean;
}) {
  const handleSubmit = (values: ContactFormValues) => {
    onSubmit && onSubmit(values);
  };

  const splitNames = (nameValue?: string) => {
    if (!nameValue) return null;

    const names = nameValue.split(' ');
    const name = names[0];
    const surName = names.slice(1).join(' ');
    return { name, surName };
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: splitNames(name)?.name || '',
      surName: splitNames(name)?.surName || '',
      phone: '',
      alt_phone: '',
      email: '',
    },
  });

  return (
    <div className="m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Required. Must be at least 1 character."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Required. Must be at least 1 character."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(XXX) XXX-XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alt_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alt. Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(XXX) XXX-XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center mt-2">
            <Button type="submit" disabled={submitting}>
              Add Contact
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
