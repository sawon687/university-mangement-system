"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { Building2, Hash, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { inputClass } from "../../utils/input-class";
import { departmentSchema } from "../../validation";
import { useDepartment } from "../../hooks/department.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

const DepartmentFrom = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createDepartment, isPending } = useDepartment();
  const [serverError, setServerError] = useState("");
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      name: "MathMathic",
      code: "MAT",
      description: "This deparmte data",
    },
    validators: {
      onSubmit: departmentSchema,
    },

    onSubmit: ({ value }) => {
      console.log(value);
      const departmentData = {
        name: value.name,
        code: value.code,
        description: value.description,
      };

      createDepartment(departmentData, {
        onSuccess: (res) => {
          onClose();
          toast.add({
            title: "Department Create",
            description: res.message,
            type: "success",
          });
          queryClient.invalidateQueries({ queryKey: ["departments"] });
        },
        onError: (error: any) => {
          console.log("erros", error.data);
          setServerError(error.data.message);
          toast.add({
            title: "Department Create  feild",
            description: error.data.message || error.errors.message,
            type: "Error",
          });
        },
      });
    },
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5 px-6 py-6"
      >
        {serverError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        {/* Department Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-isvalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  Department Name
                </FieldLabel>

                <div className="relative mt-1.5">
                  <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Computer Science & Engineering"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-11  pl-9  ${inputClass}`}
                  />
                </div>

                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        {/* Department Code */}
        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-isvalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  Department Code
                </FieldLabel>

                <div className="relative mt-1.5">
                  <Hash className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="CSE"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value.toUpperCase())
                    }
                    className={`h-11  pl-9 uppercase ${inputClass}`}
                  />
                </div>

                <FieldDescription>
                  Use a short unique code such as CSE, EEE or BBA.
                </FieldDescription>

                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-isvalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  Description
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>

                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Briefly describe this academic department..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`mt-1.5 min-h-28 resize-none ${inputClass} `}
                />
                <FieldError errors={field.state.meta.errors} />
                <FieldDescription>
                  A short description helps students understand the department.
                </FieldDescription>
              </Field>
            );
          }}
        </form.Field>

        {/* Footer */}
        <div className="-mx-6 -mb-6 flex items-center justify-end gap-2 border-t bg-muted/20 px-6 py-4">
          <Button
            onClick={onClose}
            type="button"
            variant="ghost"
            className="rounded-lg"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            type="submit"
            className="rounded-lg px-5"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                {" "}
                <Plus className="mr-2 size-4" />
                Create Department
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default DepartmentFrom;
