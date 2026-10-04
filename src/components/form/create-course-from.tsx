"use client";

import { useForm } from "@tanstack/react-form";
import React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { inputClass } from "../../utils/input-class";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { IDepartment } from "../../type";
import { useGetDepartment } from "../../hooks/department.hook";
import { Button } from "../ui/button";
import { useGetProgram } from "../../hooks/program.hook";
import { IProgram } from "../../type/program.type";
import { createCourseValidation } from "../../validation/course.validation";
import { useCreateCourse } from "../../hooks/courses.hook";
import { toast } from "../ui/toast";
import { Spinner } from '../ui/spinner';

const CreateCourseFrom = ({ onClose }: { onClose: () => void }) => {
  const { data } = useGetDepartment("");
  const { data: result } = useGetProgram();
  const { mutate: createCourse, isPending } = useCreateCourse();
  const programs: IProgram[] = result?.data?.programs || [];
  console.log("result progaram", result?.data.programs);
  const departments = data?.data;
  console.log("sawon", departments);
  const form = useForm({
    defaultValues: {
      title: "",
      code: "",
      description: "",
      departmentId: "",
      credit: 0,
      semesterNumber: 0,
      programId: "",
    } as z.input<typeof createCourseValidation>,
    validators: {
      onSubmit: createCourseValidation,
    },
    onSubmit: ({ value }) => {
      console.log("data loin", value);

      const payload = {
        ...value,
        description: value.description ?? "",
      };

      createCourse(payload, {
        onSuccess: (res) => {
          toast.add({
            title: "Course  success",
            description: res.message,
            type: "success",
          });
          onClose()
        },

        onError: (error: any) => {
          console.log("erros", error.data);

          toast.add({
            title: "Course feild",
            description: error.data.message || error.errors.message||error.erros[0].message,
            type: "Error",
          });
          onClose()
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-5">
        {/* Course Title */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-isvalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  Course Title
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. Discrete Mathematics"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`h-9 ${inputClass}`}
                />

                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        {/* Code + Credit */}
        <div className="grid grid-cols-2 gap-4">
          {/* Course Code */}
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
                    Course Code
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="e.g. CSE-103"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-9 ${inputClass}`}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          {/* Credit */}
          <form.Field name="credit">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Credit
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    placeholder="e.g. 3"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value) || 0)
                    }
                    className={`h-9 ${inputClass}`}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Department */}
        <form.Field name="departmentId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const selectedDepartment = departments?.find(
              (dept: IDepartment) => dept.id === field.state.value,
            );

            return (
              <Field data-isvalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  Department
                </FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    field.handleChange(value ?? "");
                  }}
                >
                  <SelectTrigger className={`h-9 ${inputClass}`}>
                    <SelectValue placeholder="Select department">
                      {selectedDepartment?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {departments?.map((dept: IDepartment) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        {/* Semester + Program */}
        <div className="grid grid-cols-2 gap-4">
          {/* Semester */}
          <form.Field name="semesterNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Semester
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    placeholder="e.g. 1"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value) || 0)
                    }
                    className={`h-9 ${inputClass}`}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          {/* Program */}
          <form.Field name="programId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const selectedPrograms = programs?.find(
                (prog: IProgram) => prog.id === field.state.value,
              );

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Programs
                  </FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value ?? "");
                    }}
                  >
                    <SelectTrigger className={`h-9 ${inputClass}`}>
                      <SelectValue placeholder="Select department">
                        {selectedPrograms?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {programs?.map((prog: IProgram) => (
                        <SelectItem key={prog.id} value={prog.id}>
                          {prog.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>
        </div>

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
                  placeholder="Briefly describe this course..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`min-h-24 resize-none ${inputClass}`}
                />

                <FieldError errors={field.state.meta.errors} />

                <FieldDescription>
                  A short description helps students understand the course.
                </FieldDescription>
              </Field>
            );
          }}
        </form.Field>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

     
             <Button disabled={isPending} type="submit">
                {isPending?<><Spinner/></>:'Create Course'}
                </Button>
          
        </div>
      </FieldGroup>
    </form>
  );
};

export default CreateCourseFrom;
