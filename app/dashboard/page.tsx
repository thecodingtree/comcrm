import { getServerSession } from 'next-auth/next';
import type { NextRequest } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import Image from 'next/image';
import Link from 'next/link';

export default async function Dashboard(reg: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>{`User: ${session?.user?.email}`}</h1>
      <h1>Dashboard</h1>
      <Image
        src={`${session ? session?.user?.image : ''}`}
        width="100"
        height="100"
        alt="User Image"
      />
      <Link href="/api/auth/signout">Sign Out</Link>
    </div>
  );
}
