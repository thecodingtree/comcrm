import { redirect } from 'next/navigation';
import { getAuthedServerSession } from '@/server/utils';

import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

import horselg from '@/assets/images/horselg.jpg';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthedServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex flex-row">
      <div className="flex-1 shadow-lg">
        <AspectRatio ratio={3 / 4}>
          <Image
            src={horselg}
            alt="Image"
            className="object-cover min-h-screen h-full"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-1 text-slate-300 justify-center items-center">
        <Card className="w-3/4 shadow-xl">
          <CardContent className="flex flex-col gap-4 p-4 justify-center">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
