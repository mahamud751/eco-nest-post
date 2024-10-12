import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name || null,
            password: "123456Pt!1", // Use a better approach for the password in real scenarios
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const registeredUser = data.user;

        // Store user and token in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(registeredUser));
          localStorage.setItem("token", token);
        }

        return true;
      } else {
        console.error("Error registering user:", await response.text());
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};
