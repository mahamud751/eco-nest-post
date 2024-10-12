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
            password: "123456Pt!1",
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};
