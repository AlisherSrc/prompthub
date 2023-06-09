import NextAuth, { DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AuthOptions } from 'next-auth';

import { connectToDB } from '@utils/database';
import User  from '@models/user';

interface CustomSession extends DefaultSession{
  user?: {
    id?: string,
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks:{
    async session({session}): Promise<CustomSession>{
      const sessionUser = await User.findOne({
        email: session.user?.email
      });
      if(session && session.user) session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({profile}){
        try {
            await connectToDB();

            // check if a user already exists
            const userExists = await User.findOne({
              email: profile?.email
            });
            // If not, then create a new one
            if(!userExists){
              await User.create({
                email: profile?.email,
                username: profile?.name?.replace(" ", "").toLowerCase(),
                image: profile?.image
              })
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
  }
  



});

export {handler as GET, handler as POST};