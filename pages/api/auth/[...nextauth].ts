import NextAuth from 'next-auth';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SiweMessage } from 'siwe';

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      address: string;
    } & DefaultSession['user'];
  }
}

const authURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL;

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.address = token.sub;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));
          if (!authURL) return null;
          const nextAuthUrl = new URL(authURL);

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: nextAuthUrl.host,
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
