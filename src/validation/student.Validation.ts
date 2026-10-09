import { z } from "zod";
export const studentProfileValidationSchema = z.object({

    phone: z.string().trim().min(11, "Phone number is required"),

    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      message: "Invalid gender",
    }),

    dateOfBirth: z.string({
      message: "Valid date of birth is required",
    }),

    address: z.string().trim().min(1, "Address is required"),
    departmentId: z.string().trim().min(5, "departmentId is Reqauired"),

});