'use client';

import { useEffect } from 'react';

import { trpc } from '@/app/_trpc/client';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { useDebouncedState } from '@/libs/hooks';
import { cn } from '@/libs/utils';

const schema = z.object({
  name: z.string(),
  slug: z.string(),
  linkData: z.boolean().optional().default(true),
});

export type CreateTeamFormValues = z.infer<typeof schema>;

export default function CreateTeamForm({
  onSubmit,
  submitting,
}: {
  name?: string;
  onSubmit: (values: CreateTeamFormValues) => void;
  submitting?: boolean;
}) {
  const [slug, setSlug] = useDebouncedState('', 1000);

  const { data, isLoading } = trpc.team.isTeamSlugAvailable.useQuery({ slug });

  const isAvailable =
    slug?.length > 0 && !isLoading ? data?.available : undefined;

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      slug: '',
      linkData: true,
    },
  });

  const nameAvailableContent = slug && (
    <div className="grid grid-flow-row gap-2">
      <div className="text-xl font-bold">
        {isAvailable === true ? 'Good news,' : 'Sorry,'}
      </div>
      <div className="flex flex-row gap-1">
        <div
          className={cn([
            'font-normal',
            isAvailable ? 'text-green-600' : 'text-red-600',
          ])}
        >
          {slug}
        </div>
        <div
          className={cn([
            'font-light',
            isAvailable ? 'text-green-600' : 'text-red-600',
          ])}
        >
          {isAvailable && isAvailable === true
            ? ' is available!'
            : ' is not available.'}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    form.setValue('slug', slug);
  }, [slug, form]);

  return (
    <div className="m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      setSlug(slugify(event.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <div className="text-xl font-bold">Thinking...</div>
          ) : (
            nameAvailableContent
          )}

          <FormField
            control={form.control}
            name="linkData"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Link all existing data to this team
                  </FormLabel>
                  <FormDescription>
                    This will link of your existing data to this team. If you
                    opt out, only new data will be linked to this team.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center mt-2">
            <Button type="submit" disabled={submitting || isAvailable !== true}>
              Create Team
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
