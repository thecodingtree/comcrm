import { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/client';

import { sendVerificationRequest } from '@/emails/send-verification';

const providers = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  EmailProvider({
    from: process.env.DEFAULT_EMAIL_FROM!,
    sendVerificationRequest,
  }),
];

export const authOptions: NextAuthOptions = {
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
          email: user?.email,
          image: user?.image,
          id: token.sub,
        },
      };
      return session;
    },
  },
  providers,
  adapter: PrismaAdapter(prisma),
};
