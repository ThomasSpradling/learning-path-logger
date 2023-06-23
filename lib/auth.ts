import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import prisma from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const loginRes = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Types': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await loginRes.json();
        return user || null;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    session: async ({ token, session }) => {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        // @ts-ignore
        session.user.username = token.username;
      }

      return session;
    },

    jwt: async ({ token, user }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
