import { trpc } from '@/app/_trpc/client';

import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import { AddNote, getNoteDateLabel } from '@/components/content/Notes';

import { NoteType } from '@/server/sharedTypes';

export default function EntitiyNotesTable({ entity }: { entity: string }) {
  const { data, refetch } = trpc.notes.getNotes.useQuery({
    filter: { entity: { id: [entity] } },
  });

  const createNote = trpc.notes.createNote.useMutation({
    onSettled: () => refetch(),
  });

  const rowRenderer = (row: NoteType) => {
    const date = new Date(row.createdAt);
    return (
      <TableRow key={row.id}>
        <TableCell>{getNoteDateLabel(date)}</TableCell>
        <TableCell>{row.content}</TableCell>
        <TableCell>{row.creator?.email}</TableCell>
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
            <TableHead>Creator</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => rowRenderer(row))}
          <TableRow>
            <TableCell colSpan={2}>
              {
                <div className="flex flex-col w-[50%] justify-center">
                  <AddNote
                    onAddNote={(content) =>
                      createNote.mutate({ entityId: entity, content })
                    }
                  />
                </div>
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
