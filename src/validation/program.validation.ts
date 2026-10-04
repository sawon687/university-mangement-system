import { z } from "zod";
export const programSchema = z.object({
  departmentId: z.string().min(1, "Department is required"),
  name: z.string().min(2, "Program name is required"),
  degreeType: z.enum(["BSC", "MSC", "BA", "BBA", "MBA"]),
  duration: z.coerce.number().min(1, "Duration must be at least 1 year"),
  totalCredits: z.number().min(1, "Total credits are required"),
  semester: z.number().min(1, "Semester count is required"),
  semesterType: z.enum(["TRI_SEMESTER", "BI_SEMESTER"]),
  description: z.string().optional(),
  admissionFee: z.coerce.number().min(0, "Invalid fee"),
  tuitionFee: z.coerce.number().min(0, "Invalid fee"),
  perCreditFee: z.coerce.number().min(0, "Invalid fee"),
  totalFee: z.coerce.number().min(0, "Invalid fee"),
  isActive: z.boolean(),
});

