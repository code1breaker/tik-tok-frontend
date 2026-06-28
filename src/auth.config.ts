import axios from "axios";
import Credentials from "next-auth/providers/credentials";
import env from "./lib/env";

import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { identifier, password } = credentials || {};
        const url = env.API_BASE_URL + "/api/auth/login";
        const res = await axios.post(url, { identifier, password });

        const {
          _id,
          fullname,
          username,
          email,
          photoUrl,
          accessToken,
          refreshToken,
          expiresIn,
        } = res.data?.data;

        return {
          _id,
          fullname,
          username,
          email,
          photoUrl,
          accessToken,
          refreshToken,
          expiresAt: Date.now() + expiresIn,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
