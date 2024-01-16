'use client';

import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { TextInput } from '@mantine/core';

import { Button } from '@/components/ui/button';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const getTodos = trpc.todo.getTodos.useQuery();
  const addTodo = trpc.todo.addTodo.useMutation();

  const getTodosAuthed = trpc.todo.getTodosAuthed.useQuery();

  return (
    <div>
      <h1>Dashboard - Home</h1>
      {/* {JSON.stringify(getTodos.data)} */}
      {JSON.stringify(getTodosAuthed)}
      <TextInput
        label="title"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextInput
        label="description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Button onClick={() => addTodo.mutate({ title, description })}>
        Add
      </Button>
    </div>
  );
}
