import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      fullname: string;
      username: string;
      photoUrl: string;
      email: string;
    } & DefaultSession["user"];

    accessToken: string;
    refreshToken: string;
    error: string;
  }

  interface User {
    _id: string;
    email: string;
    fullname: string;
    username: string;
    photoUrl: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    fullname: string;
    username: string;
    photoUrl: string;
    accessToken: string;
    refreshToken: string;
    error: string;
    expiresAt: number;
  }
}
