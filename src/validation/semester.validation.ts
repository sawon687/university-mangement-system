import { z } from "zod";

export const createSemesterValidationSchema = z
  .object({
    name: z.enum(["FALL", "SUMMER", "SPRING"], {
      error: "Please select a valid semester",
    }),
    registrationOpen: z.boolean().optional(),
    year: z
      .number()
      .int("Year must be a whole number")
      .min(new Date().getFullYear(), {
        message: `Year must be ${new Date().getFullYear()} or later`,
      }),

    startDate: z.coerce.date({
      error: "Start date is required",
    }),

    endDate: z.coerce.date({
      error: "End date is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.startDate.getFullYear() !== data.year) {
      ctx.addIssue({
        code: "custom",
        message: `Start date must be in ${data.year}`,
        path: ["startDate"],
      });
    }

    if (data.endDate.getFullYear() !== data.year) {
      ctx.addIssue({
        code: "custom",
        message: `End date must be in ${data.year}`,
        path: ["endDate"],
      });
    }

    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }
  });

export const updateSemesterValidationSchema = z
  .object({
    registrationOpen: z.boolean().optional(),

    startDate: z.coerce.date({
      error: "Start date is required",
    }),

    endDate: z.coerce.date({
      error: "End date is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }
  });
