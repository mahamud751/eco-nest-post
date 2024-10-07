import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useAuth } from "@/services/hooks/auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: async (profile) => {
        const { registerUser } = useAuth();

        // Ensure useAuth() is defined correctly in your context
        if (registerUser) {
          await registerUser(
            profile.name || "",
            profile.email,
            "", 
            "", 
            "", 
            ""
          );
        }

        return profile;
      },
    }),
  ],
  pages: {
    signIn: "/auth", 
  },
});
