import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(/[._-]/, "Email must contain a special character "),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(
        /^01[3-9]\d{8}$/,
        "Please enter a valid Bangladeshi phone number",
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Email is not valid"),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });