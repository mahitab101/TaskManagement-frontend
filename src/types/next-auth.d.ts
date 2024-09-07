import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string
      sub: string
      username: string
      token: string
      id: string
      iat: number
      exp: number
      jti: string
    };
  }
}
