import { trpc } from '@/app/_trpc/client';
import { Stack, Box } from '@mantine/core';

import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import { AddNote } from '../content/Notes';

import { NoteType } from '@/server/sharedTypes';

export default function EntitiyNotesTable({ entity }: { entity: string }) {
  const { data, refetch } = trpc.notes.getNotesForEntity.useQuery({
    entityId: entity,
  });

  const createNote = trpc.notes.createNote.useMutation({
    onSettled: () => refetch(),
  });

  const rowRenderer = (row: NoteType) => {
    const date = new Date(row.createdAt);
    return (
      <TableRow key={row.id}>
        <TableCell>{`${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}</TableCell>
        <TableCell>{row.content}</TableCell>
      </TableRow>
    );
  };

  return (
    <ScrollArea>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => rowRenderer(row))}
          <TableRow>
            <TableCell colSpan={2}>
              {
                <Stack w="50%" justify="center">
                  <AddNote
                    onAddNote={(content) =>
                      createNote.mutate({ entityId: entity, content })
                    }
                  />
                </Stack>
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
