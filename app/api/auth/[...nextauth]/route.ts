import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { Session } from "next-auth";
import { SessionOptions } from "http2";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],

    // async session({session} : {}){

    // },
    // async signIn({profile}){
        
    // }

})

export default handler;
