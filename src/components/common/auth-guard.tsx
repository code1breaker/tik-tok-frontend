"use client";

import { LOGIN_PATH } from "@/src/constants/endpoints";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = useSession();

  useEffect(() => {
    if (session?.data?.error === "RefreshAccessTokenError") {
      sessionStorage.clear();
      signOut({ redirectTo: LOGIN_PATH });
    }
  }, [session]);

  return <>{children}</>;
}
