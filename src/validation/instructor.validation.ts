import { z } from "zod";
export const instructorcreateValidationSchema = z.object({

		name: z.string().min(1, "Name is required"),
		email: z.email("Invalid email address"),
		departmentId: z.uuid("Invalid department ID"),
		gender: z.enum(["MALE", "FEMALE", "OTHER"]),
	
});