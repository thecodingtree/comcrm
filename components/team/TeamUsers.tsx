'use client';

import { trpc } from '@/app/_trpc/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconUser } from '@tabler/icons-react';

export default function TeamUsers({ teamId }: { teamId: string }) {
  const { data, isLoading } = trpc.team.getTeamUsers.useQuery({ teamId });

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
      <TableFooter></TableFooter>
    </Table>
  );
}
