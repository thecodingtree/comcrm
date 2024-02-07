'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';

export default function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<Session['user'] | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session?.user);
    }
  }, [session]);

  return { user, signOut };
}
