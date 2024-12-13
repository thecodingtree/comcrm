'use client';

import { signIn } from '@/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export type EmailSignInValues = z.infer<typeof schema>;

export default function EmailSignIn() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { isTouched, error } = form.getFieldState('email');

  const signInWithEmail = async (values: EmailSignInValues) => {
    const response = await signIn('email', {
      email: values.email,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signInWithEmail)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <Button type="submit" disabled={!isTouched || error !== undefined}>
            Sign in with Email
          </Button>
        </div>
      </form>
    </Form>
  );
}
