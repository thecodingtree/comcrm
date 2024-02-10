'use client';

import { TeamRole } from '@prisma/client';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  role: z.enum([TeamRole.MEMBER, TeamRole.ADMIN, TeamRole.OWNER]),
});

export type InviteFormValues = z.infer<typeof schema>;

export default function InviteForm({
  onSubmit,
  submitting,
}: {
  name?: string;
  onSubmit: (values: InviteFormValues) => void;
  submitting?: boolean;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      role: TeamRole.MEMBER,
    },
  });

  return (
    <div className="m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invite a new member to your team!</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TeamRole.OWNER}>Owner</SelectItem>
                    <SelectItem value={TeamRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={TeamRole.MEMBER}>Member</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center mt-2">
            <Button type="submit" disabled={submitting}>
              Send Invite
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
