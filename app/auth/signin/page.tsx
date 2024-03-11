import { getProviders, getCsrfToken } from 'next-auth/react';

import OAuthSignIn from '@/components/auth/OAuthSignIn';
import EmailSignIn from '@/components/auth/EmailSignIn';
import { Separator } from '@/components/ui/separator';

export default async function LoginPage() {
  const csrf = await getCsrfToken();
  const providers = await getProviders();

  return (
    <>
      <EmailSignIn csrf={csrf} />
      <div className="text-center">OR</div>
      <Separator />
      <div className="flex flex-row gap-4 items-center justify-center">
        {Object.values(providers ?? [])
          .filter((p) => p.type === 'oauth')
          .map((provider) => (
            <div key={provider.name}>
              <OAuthSignIn id={provider.id} name={provider.name} />
            </div>
          ))}
      </div>
    </>
  );
}
