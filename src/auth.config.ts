import type { NextAuthConfig } from "next-auth";
import { PROTECTED_ROUTES } from "./lib/routes";
declare module "next-auth" {
  interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    accessToken: string;
    isAdmin: string;
    userId: string;
    username: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    isAdmin: boolean;
    sessionToken: string;
  }

  interface JWT {
    user: User;
    accessToken: string;
    isAdmin: boolean;
  }
}
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith("/user/login");
      if (isLoginPage && isAuthenticated) {
        return Response.redirect(new URL(nextUrl.origin));
      }
      else if (!isAuthenticated && isLoginPage) {
        return true;
      }
      if (!isAuthenticated && PROTECTED_ROUTES.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/user/login", nextUrl));
      }
      return isAuthenticated;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.userId = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.accessToken = token.accessToken as string;
        session.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.userId;
        token.username = user.username;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
