import { z } from "zod";
export const createCourseValidation = z.object({
	
		code: z.string().trim().min(1, "Course code is required"),

		departmentId: z.string().uuid("Invalid department ID"),

		description: z.string().trim().optional(),

		title: z.string().trim().min(1, "Course title is required"),

		programId: z.string().uuid("Invalid program ID"),

		credit: z.number().positive("Credit must be greater than 0"),

		semesterNumber: z.number().int().positive(),
	
});