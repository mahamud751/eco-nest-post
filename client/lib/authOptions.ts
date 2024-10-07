
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
        async signIn({ user }) {
            // Handle sending data to your backend API for first-time Google logins

            // Example using fetch (replace with your preferred HTTP client)
            const response = await fetch('https://api.korbojoy.shop/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name || null,
                    password: '123456Pt!1'
                })
            });

            // Check API response for success and handle errors appropriately
            if (!response.ok) {
                console.error('Error registering user:', await response.text());
                // Consider throwing an error or displaying an error message to the user
            } else {
                console.log('Successfully registered user:', await response.json());
            }

            return true; // Allow sign in to proceed
        },
    },


}




