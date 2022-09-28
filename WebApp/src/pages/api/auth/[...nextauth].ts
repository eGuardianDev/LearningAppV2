import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { loginSchema } from "../../../utils/validation/auth";

export const authOptions: NextAuthOptions = {

  // Include user.id on session
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_ID||'',
      clientSecret:process.env.GOOGLE_SECRET||''
    }),
    FacebookProvider({
      clientId:process.env.Facebook_ID||'',
      clientSecret:process.env.Facebook_SECRET||''
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);
        console.log(creds);
        
        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user || user.password===null) {
          return null;
        }
        console.log(user);
        

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      },
    })
  ],
  session:{
    strategy:"jwt"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
        if (token) {
          session.id = token.id;
        }
  
        return session;
      },
  },
  secret: "super-secret",
  jwt: {
    maxAge: 5 * 60, // 5 min
  },
  pages: {
    signIn: "/auth",
    // newUser: "/sign-up",
  },
};

export default NextAuth(authOptions);
