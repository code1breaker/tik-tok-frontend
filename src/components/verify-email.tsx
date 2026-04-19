import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MailCheck } from "lucide-react";
import { Button } from "./ui/button";
import * as authApi from "../services/auth.service";
import { toast } from "sonner";
import { MESSAGES } from "../constants/messages";

export default function VerifyEmail({ email = "" }: { email: string }) {
  const handleResendVerification = async () => {
    try {
      const res = await authApi.resendVerification({ identifier: email });
      toast.success(MESSAGES[res.data.code as keyof typeof MESSAGES]);
    } catch (error: any) {
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      console.log("Resend Verification Error: ", error);
    }
  };
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      {/* Icon */}
      <div className="grid place-content-center my-4  ">
        <MailCheck />
      </div>

      {/* Header */}
      <CardHeader>
        <CardTitle className="text-center text-xl!">
          Please verify your email
        </CardTitle>
        <CardDescription className="text-center mt-2">
          You're almost there! We sent an email to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="text-center my-4 text-muted-foreground">
        <p>Just click on the link in that email to complete signup.</p>
        <p>After verifying email, you can close this window.</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="bg-transparent flex flex-col items-center border-0 mb-4">
        <p className="text-sm text-muted-foreground">
          Still can't find the email? No problem.
        </p>
        <Button
          variant={"link"}
          size="lg"
          className="mx-auto px-5"
          onClick={handleResendVerification}
        >
          Resend Verification Email
        </Button>
      </CardFooter>
    </Card>
  );
}
