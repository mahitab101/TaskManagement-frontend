import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions : NextAuthOptions={
  session: {
    strategy: "jwt",
  },
    providers:[
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {},
            password: {},
          },
            async authorize(credentials, req) {
              try {
                const response = await fetch(`http://todolistapi.runasp.net/api/Account/login`, {
                  method: 'POST',
                  headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: credentials?.username,
                    password: credentials?.password,
                  }),
                });
                const user = await response.json();
                if(user.password != credentials?.password)
                {
                  console.log("password incorrect")
                } 
                if (response.ok && user) {
                  return user; 
                }
              } catch (error) {
                console.log("Unexpected error::", error);
              }
                
                 // console.log("Login error:", user);
                  return null; 
                },
              }),
            ],
    // callbacks: {
    //   jwt: async ({ user, token, trigger, session }) => {
    //     if (trigger === "update") {
    //       return { ...token, ...session.user };
    //     }
    //     return { ...token, ...user };
    //   },
    // },
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token, user }) {
          session.user = token as any;
          return session;
        },
      },
};
