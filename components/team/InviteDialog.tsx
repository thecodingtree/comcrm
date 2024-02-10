'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { TeamRole } from '@prisma/client';
import { trpc } from '@/app/_trpc/client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import InviteForm, { InviteFormValues } from '@/components/team/InviteForm';

export default function InviteDialog({
  teamId,
  onSuccess,
}: {
  teamId: string;
  onSuccess?: () => void;
}) {
  const [opened, setOpened] = useState(false);

  const inviteMember = trpc.team.inviteMember.useMutation({
    onSettled: () => setOpened(false),
    onSuccess: (data) => {
      toast.success(`Invite sent to ${data.email}`);

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const handleInvite = ({ email, role }: InviteFormValues) => {
    inviteMember.mutate({ email, teamId, role });
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button>Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <InviteForm onSubmit={(values) => handleInvite(values)} />
      </DialogContent>
    </Dialog>
  );
}
