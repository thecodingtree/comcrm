'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

type User = any;

export default function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session?.user);
    }
  }, [session]);

  return { user, signOut };
}
