import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(
      /[._-]/,
      "Email must contain a special character "
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});