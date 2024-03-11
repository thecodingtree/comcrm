'use client';

import { signIn } from 'next-auth/react';

import { IconButton } from '@/components/controls/Buttons';

import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';

const getOAuthIcon = (id: string) => {
  switch (id) {
    case 'google':
      return <IconBrandGoogle />;
    case 'github':
      return <IconBrandGithub />;
    default:
      return null;
  }
};

export default function OAuthSignIn({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <IconButton
      className="w-10 h-10 rounded-2xl border-2 border-black"
      icon={getOAuthIcon(id)}
      onClick={() => signIn(id)}
    />
  );
}
