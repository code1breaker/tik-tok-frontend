"use client";

import { useRouter, useSearchParams } from "next/navigation";
import VerifyEmail from "@/src/components/verify-email";
import VerifyPhone from "@/src/components/verify-phone";
import { useEffect } from "react";
import * as authApi from "../../../services/auth/auth.client";
import { toast } from "sonner";
import { MESSAGES } from "@/src/constants/messages";
import { HOME_PATH } from "@/src/constants/endpoints";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact") || "";
  const isEmail = contact?.includes("@");
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) return;

        const res = await authApi.verifyEmail({ token });
        toast.success(MESSAGES[res.data.code as keyof typeof MESSAGES]);
        setTimeout(() => {
          router.push(HOME_PATH);
        }, 2000);
      } catch (error: any) {
        toast.error(
          MESSAGES[error.data.code as keyof typeof MESSAGES] ||
            MESSAGES.DEFAULT_MESSAGE,
        );
        console.log("Verify Email Error: ", error);
      }
    };

    verifyEmail();
  }, []);

  return (
    <>
      {isEmail && <VerifyEmail email={contact} />}
      {!isEmail && <VerifyPhone phone={contact} />}
    </>
  );
}
