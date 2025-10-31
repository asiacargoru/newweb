import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Try DB-based authentication first if DB env is present
        try {
          if (process.env.DB_NAME && process.env.DB_USER) {
            const result = await db.query('SELECT * FROM admins WHERE email = $1', [credentials.email]);
            const user = result.rows?.[0];
            if (user) {
              const isValid = await bcrypt.compare(credentials.password, user.password_hash);
              if (isValid) {
                return { id: user.id.toString(), email: user.email, name: user.name };
              }
            }
          }
        } catch (e) {
          // fall back to env-based auth
        }

        // Fallback: use ADMIN_EMAIL + ADMIN_PASSWORD_HASH from env
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (adminEmail && adminHash && credentials.email === adminEmail) {
          const ok = await bcrypt.compare(credentials.password, adminHash);
          if (ok) {
            return { id: 'env-admin', email: adminEmail, name: 'Admin' };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.id as string;
      return session;
    },
  },
};
