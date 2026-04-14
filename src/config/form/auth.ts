import PATTERN from "@/src/constants/pattern";
import * as z from "zod";

export const signupFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .refine(
      (val) => z.email().safeParse(val).success || PATTERN.PHONE.test(val),
      {
        message: "Enter a valid email address or phone number",
      },
    ),
  fullname: z
    .string()
    .trim()
    .min(3, "Fullname must be at least 3 characters.")
    .max(32, "Fullname must be at most 32 characters."),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters."),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Enter a valid email address, username or phone number.")
    .max(20, "Enter a valid email address, username or phone number."),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(32, "Password must be at most 32 characters."),
});
