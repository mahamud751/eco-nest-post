
// import axios from 'axios';
//test

import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            if (profile) {
                console.log("Profile:", profile);
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
                    return '/auth/error?error=RegistrationFailed'; // Abort and redirect if an error occurs
                }
            }
            return true; // Continue with sign-in
        },
        async session({ session, token }) {
            if (session?.user) {
                // If you need to enrich the session object, do so here
                session.user.id = token.sub;
                return session; // Return the updated session object
            }
            return session; // Default session object
        },
    },

}




