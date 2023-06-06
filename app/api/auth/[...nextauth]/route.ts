import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const loginRes = await fetch('http://localhost:3000/api/login', {
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
});

export { handler as GET, handler as POST };
