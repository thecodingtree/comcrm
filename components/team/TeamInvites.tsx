'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

import InviteDialog from '@/components/team/InviteDialog';

export default function TeamInvites({
  team,
  email,
  canAdminTeam = false,
}: {
  team?: string;
  email?: string;
  canAdminTeam?: boolean;
}) {
  const router = useRouter();
  const { data, isLoading, refetch } = trpc.team.getTeamInvites.useQuery({
    team,
    email,
  });

  const acceptInviteMutate = trpc.team.acceptInvite.useMutation();
  const deleteInviteMutate = trpc.team.deleteInvite.useMutation();
  const resendInviteMutate = trpc.team.resendInvite.useMutation();

  const acceptInvite = (token: string) => {
    acceptInviteMutate.mutate(
      { token },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  };

  const deleteInvite = (id: number) => {
    deleteInviteMutate.mutate(
      { id },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const resendInvite = (id: number) => {
    resendInviteMutate.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Invite resent!');
        },
      },
    );
  };

  const teamHeader = (
    <TableRow>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead></TableHead>
    </TableRow>
  );

  const teamInvites = data?.map((invite) => {
    return (
      <TableRow key={invite.email}>
        <TableCell className="font-medium">{invite.email}</TableCell>
        <TableCell>{invite.role}</TableCell>
        <TableCell>
          {canAdminTeam && (
            <Button onClick={() => resendInvite(invite.id)}>Resend</Button>
          )}{' '}
          {canAdminTeam && (
            <Button onClick={() => deleteInvite(invite.id)}>Delete</Button>
          )}
        </TableCell>
      </TableRow>
    );
  });

  const userHeader = (
    <TableRow>
      <TableHead>Team</TableHead>
      <TableHead>Role</TableHead>
      <TableHead> </TableHead>
    </TableRow>
  );

  const userInvites = data?.map((invite) => {
    return (
      <TableRow key={invite?.email}>
        <TableCell className="font-medium">{invite.team?.name}</TableCell>
        <TableCell>{invite.role}</TableCell>
        <TableCell>
          <Button onClick={() => acceptInvite(invite.token)}>Accept</Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Table>
      <TableCaption>
        {team && canAdminTeam && (
          <InviteDialog teamId={team} onSuccess={refetch} />
        )}
      </TableCaption>
      <TableHeader>{team ? teamHeader : userHeader}</TableHeader>
      <TableBody>{team ? teamInvites : userInvites}</TableBody>
    </Table>
  );
}
