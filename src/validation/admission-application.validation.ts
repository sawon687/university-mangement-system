import { z } from "zod";

export const MAX_FILES_SIZE = 5;
export const MAX_FILES_SIZE_BYTES = MAX_FILES_SIZE * 1080 * 1080; // MB TO KB TO BYTES CONVERT

export function fileAcceptsSize(filesize: number) {
  return filesize <= MAX_FILES_SIZE_BYTES;
}
export const ALLOWED_FILE_TYPES: readonly string[] = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "application/pdf",
];

export function fileAcceptsType(fileType: string) {
  return ALLOWED_FILE_TYPES.includes(fileType);
}

const fileSchema = z.custom<File>((val) => val instanceof File, {
  message: "Valid file is required",
});

export const admissionSchema = z
  .object({
    programId: z.string().uuid("Program ID is required"),
    educationType: z.enum(["HSC", "DIPLOMA"]),

    // File fields
    sscResult: fileSchema,
    hscResult: fileSchema.optional(),
    diplomaResult: fileSchema.optional(),
  })
  .refine(
    (data) => {
      // Education Type onujayi check korbe
      if (data.educationType === "HSC") {
        return data.hscResult !== undefined;
      }
      if (data.educationType === "DIPLOMA") {
        return data.diplomaResult !== undefined;
      }
      return false;
    },
    {
      message:
        "HSC result file or Diploma result file is required based on education type",
      path: ["educationType"],
    },
  );
