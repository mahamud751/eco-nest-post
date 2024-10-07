
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
                    scope: "openid email profile",
                },
            },
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

                    return '/auth/error?error=RegistrationFailed';
                }
            }
            return true;
        },

    },
}




