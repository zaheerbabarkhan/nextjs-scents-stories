import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchUserData } from "./lib/data";
import { authConfig } from "./auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const userData = await fetchUserData(
            credentials.email as string,
            credentials.password as string
          );
          if (!userData) return null;
          else {
            const user: User = {
              name: `${userData.name.firstname} ${userData.name.lastname}`,
              accessToken: userData.token,
              isAdmin: userData.isAdmin,
              userId: userData.userId,
              username: userData.username,
            };
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
