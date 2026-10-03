import { z } from "zod";


export const departmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Department name is required"),

  code: z
    .string()
    .trim()
    .min(1, "Department code is required"),

  description: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 10,
      "Description must be at least 10 characters"
    ),
});