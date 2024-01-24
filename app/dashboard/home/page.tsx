'use client';

import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <p>{JSON.stringify(getTodosAuthed)}</p>
      <Label htmlFor="title">title</Label>
      <Input id="title" onChange={(e) => setTitle(e.currentTarget.value)} />
      <Label htmlFor="description">description</Label>
      <Input
        id="description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Button onClick={() => addTodo.mutate({ title, description })}>
        Add
      </Button>
    </div>
  );
}
