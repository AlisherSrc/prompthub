import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AuthOptions } from 'next-auth';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks:{
    async session({session}){
        return session;
    },

    async signIn({profile}){
        return new Promise(" ");
    }
  }
  



});


export default (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};