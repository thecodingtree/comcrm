import {
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from '@mantine/core';
import classes from './Note.module.css';

interface NoteProps {
  note: {
    poster: string;
    date: string;
    note: string;
  };
}

export default function Note({ note }: NoteProps) {
  return (
    <Paper withBorder radius="md" className={classes.note}>
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
          alt={note.poster}
          radius="xl"
        />
        <div>
          <Text fz="sm">{note.poster}</Text>
          <Text fz="xs" c="dimmed">
            10 minutes ago
          </Text>
        </div>
      </Group>
      {/* <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html:
              '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
          }}
        />
      </TypographyStylesProvider> */}
      <Text>{note.note}</Text>
    </Paper>
  );
}
