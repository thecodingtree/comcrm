import { trpc } from '@/app/_trpc/client';
import { Table, Stack, Box, ScrollArea } from '@mantine/core';

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
      <Table.Tr key={row.id}>
        <Table.Td>{`${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}</Table.Td>
        <Table.Td>{row.content}</Table.Td>
      </Table.Tr>
    );
  };

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Content</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((row) => rowRenderer(row))}
          <Table.Tr>
            <Table.Td colSpan={2}>
              {
                <Stack w="50%" justify="center">
                  <AddNote
                    onAddNote={(content) =>
                      createNote.mutate({ entityId: entity, content })
                    }
                  />
                </Stack>
              }
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
