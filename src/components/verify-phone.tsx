import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Phone } from "lucide-react";
import * as authApi from "../services/auth.service";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field } from "./ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useCountdown from "../hooks/use-countdown";
import { MESSAGES } from "../constants/messages";
import { HOME_PATH } from "../constants/endpoints";

export default function VerifyPhone({ phone }: { phone: string }) {
  const [otp, setOtp] = useState("");
  const { timer, startTimer, isRunning } = useCountdown({});
  const router = useRouter();

  const handleVerifyPhone = async () => {
    try {
      await authApi.verifyPhone({ phone, otp });
      toast.success("phone verified successfully");
      setTimeout(() => {
        router.push(HOME_PATH);
      }, 2000);
    } catch (error) {
      toast.error("invalid OTP");
      console.log("Verify Phone Error: ", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      startTimer();
      const res = await authApi.resendVerification({ identifier: phone });
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
    <Card className="mx-auto w-full max-w-sm p-6">
      {/* Icon */}
      <div className="flex justify-center mt-2 mb-4">
        <Phone className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* Header */}
      <CardHeader className="p-0 text-center space-y-2">
        <CardTitle className="text-xl font-semibold">
          Please verify your phone
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          We sent a 4-digit OTP to <strong>{phone}</strong>
        </CardDescription>
      </CardHeader>

      {/* OTP Input */}
      <CardContent className="pt-6 pb-4 flex flex-col items-center gap-6">
        <Field className="w-fit mx-auto">
          <InputOTP
            id="otp"
            maxLength={4}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup className="flex gap-5">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </Field>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleVerifyPhone}
        >
          Verify OTP
        </Button>
      </CardContent>

      {/* Footer */}
      <CardFooter className="bg-transparent flex flex-col items-center gap-3 pb-2">
        <p className="text-sm text-muted-foreground">
          Didn’t receive the code?
        </p>

        <Button
          variant={"link"}
          onClick={handleResendVerification}
          disabled={isRunning}
          className="text-sm text-primary hover:underline transition "
        >
          Resend OTP {isRunning && `(${timer})`}
        </Button>
      </CardFooter>
    </Card>
  );
}
