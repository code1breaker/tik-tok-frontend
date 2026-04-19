export interface SignupIf {
  identifier: string;
  fullname: string;
  username: string;
  password: string;
}

export interface ResendVerificationIf {
  identifier: string | number;
}

export interface VerifyEmailIf {
  token: string;
}

export interface VerifyPhoneIf {
  phone: string | number;
  otp: string | number;
}

export interface LoginIf {
  identifier: string;
  password: string;
}
