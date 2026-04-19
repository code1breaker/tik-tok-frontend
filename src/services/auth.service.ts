import api from "@/src/lib/api";
import {
  LoginIf,
  ResendVerificationIf,
  SignupIf,
  VerifyEmailIf,
  VerifyPhoneIf,
} from "@/src/types/services/auth.types";
import { AUTH_API } from "../constants/api";

export const signup = async (body: SignupIf) => {
  const res = await api.post(AUTH_API.SIGNUP, body);
  return res;
};

export const resendVerification = async (body: ResendVerificationIf) => {
  const res = await api.post(AUTH_API.RESEND_VERIFICATION, body);
  return res;
};

export const verifyEmail = async ({ token }: VerifyEmailIf) => {
  const res = await api.get(`${AUTH_API.VERIFY_EMAIL}/${token}`);
  return res;
};

export const verifyPhone = async (body: VerifyPhoneIf) => {
  const res = await api.post(AUTH_API.VERIFY_PHONE, body);
  return res;
};

export const login = async (body: LoginIf) => {
  const res = await api.post(AUTH_API.LOGIN, body);
  return res;
};
