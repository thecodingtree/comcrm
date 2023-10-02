import { getServerSession } from 'next-auth/next';
import type { NextRequest } from 'next/server';

export default async function Home() {
  return (
    <div>
      <h1>Dashboard - Home</h1>
    </div>
  );
}
