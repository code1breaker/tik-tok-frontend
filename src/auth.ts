import authConfig from "@/src/auth.config";
import NextAuth from "next-auth";
import refreshAccessToken from "./helpers/refreshAccessToken";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          username: user.username,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      }

      // 🔹 If token still valid → return it
      if (Date.now() < token.expiresAt) {
        return token;
      }

      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ token, session }) {
      session.user = {
        ...session.user,
        _id: token._id,
        fullname: token.fullname,
        username: token.username,
        email: token.email,
      };

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
