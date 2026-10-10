import { z } from "zod";
export const instructorcreateValidationSchema = z.object({

		name: z.string().min(1, "Name is required"),
		email: z.email("Invalid email address"),
		departmentId: z.uuid("Invalid department ID"),
		gender: z.enum(["MALE", "FEMALE", "OTHER"]),
	
});

export const instructorProfileSchema = z.object({
 phone: z
      .string()
      .trim()
      .transform((value) => (value === "" ? undefined : value))
      .pipe(
        z
          .string()
          .regex(
            /^01[3-9]\d{8}$/,
            "Please provide a valid Bangladeshi phone number",
          )
          .optional(),
      )
      .optional(),
  departmentId: z
  .string()
  .trim()
  .uuid("Please provide a valid department ID"),

    address: z
      .string()
      .trim()
      .transform((value) => (value === "" ? undefined : value))
      .pipe(z.string().min(1, "Address cannot be empty").optional())
      .optional(),

    experience: z.preprocess(
      (value) => (value === "" || value === null ? undefined : value),
      z.coerce.string().min(0, "Experience cannot be negative").optional(),
    ),

    bio: z
      .string()
      .trim()
      .optional(),

    gender: z
      .enum(["MALE", "FEMALE", "OTHER"])
      .optional(),

    dateOfBirth: z.preprocess(
      (value) => (value === "" || value === null ? undefined : value),
      z
        .coerce
        .date()
        .refine((date) => date <= new Date(), {
          message: "Date of birth cannot be in the future",
        })
        .optional(),
    ),

    designation: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1, "Designation cannot be empty").optional(),
    ),

    specialization: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1, "Specialization cannot be empty").optional(),
    ),

    qualification: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1, "Qualification cannot be empty").optional(),
    ),
  
});