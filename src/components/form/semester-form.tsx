"use client";

import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { z } from "zod";
import { inputClass } from "../../utils/input-class";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { createSemesterValidationSchema, updateSemesterValidationSchema } from "../../validation/semester.validation";
import { useSemester, useUpdateSemester } from "../../hooks/semester.hook";

import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { Switch } from "../ui/switch";
import { ISemester } from "../../type/semester.type";
import { useQueryClient } from '@tanstack/react-query';

type SemesterFormProps = {
  onClose: () => void;
  type: "create" | "edit";
  editData?: ISemester;
};

const SemesterForm = ({ onClose, type, editData }: SemesterFormProps) => {
  const { mutate: semester, isPending } = useSemester();
 const{mutate:updateSemester,isPending:loaidng}= useUpdateSemester()
 const Queryclient=useQueryClient()
  const form = useForm({
    defaultValues: {
      name: "FALL",
      year: 0,

      startDate:
        type === "edit" ? (editData?.startDate?.slice(0, 10) ?? "") : "",

      endDate: type === "edit" ? (editData?.endDate?.slice(0, 10) ?? "") : "",

      registrationOpen:
        type === "edit" ? (editData?.registrationOpen ?? false) : false,
    } satisfies z.input<typeof createSemesterValidationSchema>,

    validators: {
      onSubmit:type==='edit'?updateSemesterValidationSchema: createSemesterValidationSchema as any,
      onChange:type==='edit'?updateSemesterValidationSchema: createSemesterValidationSchema as any,
    },

    onSubmit: ({ value }) => {
      if (type === "create") {
        const payload = {
          name: value.name,
          year: Number(value.year),
          startDate: String(value.startDate),
          endDate: String(value.endDate),
        };

        semester(payload, {
          onSuccess: (res) => {
            toast.add({
              title: "Semester success",
              description: res.message,
              type: "success",
            });

            onClose();
          },

          onError: (error: any) => {
            toast.add({
              title: "Create failed",
              description:
                error?.data?.message ||
                error?.errors?.message ||
                "Something went wrong",
              type: "Error",
            });
          },
        });
      }

    if (type === "edit") {
  if (!editData?.id) {
    toast.add({
      title: "Update failed",
      description: "Semester data is missing.",
      type: "Error",
    });
    return;
  }

  const payload = {
    startDate: String(value.startDate),
    endDate: String(value.endDate),
    registrationOpen: Boolean(value.registrationOpen),
  };

  updateSemester(
    {
      ...payload,
      id: editData.id,
    },
    {
      onSuccess: (res:any) => {
        console.log('respnse update',res)
        toast.add({
          title: "Semester updated",
          description: res.message,
          type: "success",
        });
        Queryclient.invalidateQueries({
          queryKey:['all-semester']
        })
        onClose();
      },

      onError: (error: any) => {
        console.log('error updte',error.data)
        onClose();
        toast.add({
          title: "Update failed",
          description:
            error?.data?.message || "Something went wrong",
          type: "Error",
        });
      },
    },
  );
}
    },
  });

  return (
    <div>
      <form
        className="px-6 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* CREATE ONLY - Semester */}
          {type === "create" && (
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-isvalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Semester</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as typeof field.state.value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>

                      <SelectContent>
                        {["FALL", "SUMMER", "SPRING"].map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          )}

          {/* CREATE ONLY - Academic Year */}
          {type === "create" && (
            <form.Field name="year">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-isvalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Academic Year</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={
                        field.state.value === 0 ? "" : String(field.state.value)
                      }
                      type="number"
                      onChange={(event) =>
                        field.handleChange(Number(event.target.value))
                      }
                      placeholder="e.g. 2026"
                      className={`h-9 ${inputClass}`}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          )}

          {/* Start + End Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="startDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-isvalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={String(field.state.value)}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={`h-9 ${inputClass}`}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="endDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-isvalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>End Date</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={String(field.state.value)}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={`h-9 ${inputClass}`}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* EDIT ONLY - Registration Open */}
          {type === "edit" && (
            <form.Field name="registrationOpen">
              {(field) => {
                return (
                  <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <FieldLabel>Registration</FieldLabel>

                      <p className="text-sm text-muted-foreground">
                        Allow students to register for this semester.
                      </p>
                    </div>

                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(checked: boolean) =>
                        field.handleChange(checked)
                      }
                    />
                  </Field>
                );
              }}
            </form.Field>
          )}
        </FieldGroup>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button disabled={isPending||loaidng} type="submit">
            {isPending || loaidng? (
              <Spinner />
            ) : type === "edit" ? (
              "Update Semester"
            ) : (
              "Create Semester"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SemesterForm;
