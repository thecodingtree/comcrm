'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import CreateTeamForm, { CreateTeamFormValues } from './CreateTeamForm';

export default function CreateTeamDialog() {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const createTeam = trpc.team.createTeam.useMutation({
    onSettled: () => setOpened(false),
    onSuccess: (data) => {
      toast.success(`Created team ${data.name}!`);
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (values: CreateTeamFormValues) => {
    createTeam.mutate(values);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button>Create Team</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateTeamForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
