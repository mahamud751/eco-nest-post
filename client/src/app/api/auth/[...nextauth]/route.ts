

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),


    ],
    callbacks: {
        async signIn({ profile }) {

            if (profile) {
                try {
                    await axios.post("https://api.korbojoy.shop/v1/users/register", {
                        name: profile.name || "",
                        email: profile.email || "",
                        phone: "",
                        password: "",
                        refferCode: "",
                        photos: "",
                    });
                } catch (error) {
                    console.error("Error registering user:", error);
                    return false;
                }
            }
            return true;
        },
    },
});
export { handler as GET, handler as POST };


