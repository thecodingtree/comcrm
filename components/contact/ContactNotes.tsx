import { Title, Stack } from '@mantine/core';

import Note from '@/components/content/Note';

export default function ContactNotes() {
  const testNotes = [
    {
      poster: 'John Doe',
      date: '2021-10-10',
      note: 'This is a test note',
    },
    {
      poster: 'Jane Doe',
      date: '2021-10-10',
      note: 'This is another note about something',
    },
    {
      poster: 'Tom Smith',
      date: '2021-10-10',
      note: 'I agree with the note above and think we should do more of this',
    },
  ];

  return (
    <Stack justify="flex-start">
      {testNotes.map((note, index) => (
        <Note key={`notes-${index}`} note={note} />
      ))}
    </Stack>
  );
}
