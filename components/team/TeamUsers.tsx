'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';
import { IconUser } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function TeamUsers({
  teamId,
  canAdminTeam = false,
}: {
  teamId: string;
  canAdminTeam?: boolean;
}) {
  const router = useRouter();
  const { data, isLoading, refetch } = trpc.team.getTeamUsers.useQuery({
    teamId,
  });

  const removeUser = trpc.team.removeTeamUsers.useMutation();

  const teamUsers = data?.map((teamUser) => {
    return (
      <TableRow key={teamUser?.id}>
        <TableCell className="font-medium">
          <Avatar className="">
            <AvatarImage src={teamUser?.image} />
            <AvatarFallback className="w-full">
              <IconUser size={24} />
            </AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell className="font-medium">{teamUser.name}</TableCell>
        <TableCell className="font-medium">{teamUser.email}</TableCell>
        <TableCell>{teamUser.role}</TableCell>
        <TableCell>
          {canAdminTeam && (
            <Button
              onClick={() =>
                removeUser.mutate(
                  { teamId, userIds: [teamUser?.id] },
                  { onSettled: () => refetch },
                )
              }
            >
              Remove
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{teamUsers}</TableBody>
    </Table>
  );
}
