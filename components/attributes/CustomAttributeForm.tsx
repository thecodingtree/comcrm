'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

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
import { type AttributeType } from '@/server/sharedTypes';

const AttributeInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
});

export default function CustomAttributeForm({
  defaultValues,
  submitLabel,
  showLabels = true,
  onSubmit,
  submitting,
}: {
  defaultValues?: AttributeType;
  submitLabel?: string;
  showLabels?: boolean;
  onSubmit: (attribute: AttributeType) => void;
  submitting?: boolean;
}) {
  const form = useForm<AttributeType>({
    resolver: zodResolver(AttributeInput),
    defaultValues: {
      id: defaultValues?.id ?? undefined,
      name: defaultValues?.name ?? '',
      value: defaultValues?.value ?? '',
    },
  });

  return (
    <div className="m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {showLabels && <FormLabel>Name</FormLabel>}
                  <FormControl>
                    <Input placeholder="required" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  {showLabels && <FormLabel>Value</FormLabel>}
                  <FormControl>
                    <Input placeholder="required" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-center mt-2">
            <Button type="submit" disabled={submitting}>
              {submitLabel ?? 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
