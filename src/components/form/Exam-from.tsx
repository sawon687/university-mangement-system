
"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  CalendarDays,
  ClipboardList,
  LoaderCircle,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { useCreateExam } from '../../hooks/exam.hook';
import { ExamType } from '../../type/exam.type';


const examSchema = z.object({
  examType: z.enum(["MIDTERM", "FINAL", "QUIZ"], {
    message: "Please select an exam type",
  }),
  examDate: z.string().min(1, "Please select exam date and time"),
  totalMarks: z
    .string()
    .min(1, "Total marks is required")
    .refine(
      (value) => Number.isFinite(Number(value)) && Number(value) > 0,
      "Total marks must be greater than zero",
    ),
});

interface ExamFormProps {
  courseId: string;
  semesterId: string;
  courseTitle: string;
  courseCode?: string;
  onClose: () => void;
}

const ExamForm = ({
  courseId,
  semesterId,
  courseTitle,
  courseCode,
  onClose,
}: ExamFormProps) => {
  const { mutate: createExam, isPending } = useCreateExam();

  const form = useForm({
    defaultValues: {
      examType: "",
      examDate: "",
      totalMarks: "100",
    },
    validators: {
      onSubmit: examSchema,
    },
    onSubmit: ({ value }) => {
      createExam(
        {
          courseId,
          semesterId,
          instructorId: "",
          examType: value.examType as ExamType,
          examDate: new Date(value.examDate).toISOString(),
          totalMarks: Number(value.totalMarks),
        },
        {
          onSuccess: (response: { message?: string }) => {
            toast.add({
              title: "Exam created successfully",
              description: response?.message ?? "Your exam has been scheduled.",
              type: "success",
            });

            onClose();
          },
          onError: (error: any) => {
            toast.add({
              title: "Failed to create exam",
              description:
                error?.data?.message ??
                error?.message ??
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5 px-6 py-5"
    >
      {/* Selected Course */}
      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Selected Course
            </p>
            <p className="truncate font-semibold">{courseTitle}</p>
            {courseCode && (
              <p className="mt-1 text-xs text-muted-foreground">
                Code: {courseCode}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Exam Type */}
      <form.Field name="examType">
        {(field) => {
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={invalid}>
              <FieldLabel>Exam Type *</FieldLabel>

              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>

                <SelectContent>
                  {/* Replace with your exact Prisma ExamType enum values */}
                  <SelectItem value="MIDTERM">Midterm</SelectItem>
                  <SelectItem value="FINAL">Final</SelectItem>
                  <SelectItem value="QUIZ">Quiz</SelectItem>
                </SelectContent>
              </Select>

              {invalid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          );
        }}
      </form.Field>

      {/* Exam Date */}
      <form.Field name="examDate">
        {(field) => {
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={invalid}>
              <FieldLabel>Exam Date & Time *</FieldLabel>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="datetime-local"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  onBlur={field.handleBlur}
                  className="pl-10"
                />
              </div>

              {invalid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          );
        }}
      </form.Field>

      {/* Total Marks */}
      <form.Field name="totalMarks">
        {(field) => {
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={invalid}>
              <FieldLabel>Total Marks *</FieldLabel>

              <Input
                type="number"
                min="1"
                step="0.5"
                placeholder="Enter total marks"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.target.value)
                }
                onBlur={field.handleBlur}
              />

              {invalid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          );
        }}
      </form.Field>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending} className="gap-2">
          {isPending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Creating Exam...
            </>
          ) : (
            <>
              <Save className="size-4" />
              Create Exam
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExamForm;