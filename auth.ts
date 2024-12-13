import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma/client';

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

import { sendVerificationRequest } from '@/emails/send-verification';

const providers = [
  GitHub({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  Resend({
    apiKey: process.env.RESEND_API_KEY as string,
    from: process.env.DEFAULT_EMAIL_FROM!,
    sendVerificationRequest,
  }),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true, // TODO: Remove this in production
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      const user = session?.user
        ? await prisma.user.findUnique({ where: { email: session.user.email } })
        : null;

      session = {
        ...session,
        user: {
          name: user?.name,
          email: user?.email || '',
          image: user?.image,
          emailVerified: user?.emailVerified || null,
          id: token.sub || '',
        },
      };
      return session;
    },
    authorized: ({ request, auth }) => {
      if (
        request.nextUrl.pathname.startsWith('/') &&
        !request.nextUrl.pathname.includes('/api/uploadthing') &&
        !request.nextUrl.pathname.includes('/auth/')
      ) {
        return false;
      }
      return true;
    },
  },
  providers,
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: '/auth/signin',
    //signOut: '/auth/signout',
    //error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for email verification)
    //newUser: null, // If set, new users will be directed here on first sign in
  },
});
