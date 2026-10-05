"use client";

import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  Mail,
  UserRound,
  VenusAndMars,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { inputClass } from "../../utils/input-class";
import z from "zod"
import { IDepartment } from "../../type";
import { useGetDepartment } from "../../hooks/department.hook";
import { toast } from "../ui/toast";
import { useCreateInsructor } from "../../hooks/instructor.hook";
import { Spinner } from "../ui/spinner";
import { instructorcreateValidationSchema } from '../../validation';

interface CreateInstructorFormProps {
  onSuccess?: () => void;
}

const CreateIntructorForm = ({ onSuccess }: CreateInstructorFormProps) => {
  const { data } = useGetDepartment("");
  const { mutate: register, isPending } = useCreateInsructor();
  console.log("data", data);
  const departments = data?.data || [];
  console.log("deaprtmens", departments);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      departmentId: "",
      gender: "",
    },
    validators:{
        onSubmit:instructorcreateValidationSchema
    },

    onSubmit: ({ value }) => {
      console.log(value);

      const registerData = {
        email: value.email,
        name: value.name,
        gender: value.gender,
        departmentId: value.departmentId,
      };

      register(registerData, {
        onSuccess: (res) => {
          toast.add({
            title: "Register success",
            description: res.message,
            type: "success",
          });
          onSuccess
        },
        

        onError: (error: any) => {
          console.log("erros", error.data);

          toast.add({
            title: "Register feild",
            description: error.data.message || error.errors.message,
            type: "Error",
          });
        },
      });

      onSuccess?.();
    },
  });

  return (
    <div className="max-h-[75vh] overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-6 px-6 py-6">
          <FieldGroup>
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Personal Information</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the instructor's personal and contact details.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field className="space-y-2">
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                        <div className="relative">
                          <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            placeholder="Md. Rahim Uddin"
                            value={field.state.value}
                            className={`h-10 pl-9 ${inputClass}`}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Email */}
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-isvalid={isInvalid} className="space-y-2">
                        <FieldLabel htmlFor={field.name}>
                          Email Address
                        </FieldLabel>

                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            placeholder="rahim@example.com"
                            value={field.state.value}
                            className={`h-10 pl-9 ${inputClass}`}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4 border-t pt-5">
              <div>
                <h2 className="text-sm font-semibold">Academic Information</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Assign the instructor to a department and specify their
                  gender.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Department */}
                <form.Field name="departmentId">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const selectDeaprtments: IDepartment = departments?.find(
                      (dept: IDepartment) => dept.id === field.state.value,
                    );
                    return (
                      <Field data-isvalid={isInvalid} className="space-y-1.5">
                        <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(value ?? "");
                            console.log("value", value);
                          }}
                        >
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select Department">
                              {selectDeaprtments?.name}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Gender */}
                <form.Field name="gender">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-isvalid={isInvalid} className="space-y-2">
                        <FieldLabel htmlFor={field.name}>Gender</FieldLabel>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(value ?? "")
                          }
                        >
                          <SelectTrigger
                            id={field.name}
                            className="h-10 w-full"
                          >
                            <div className="flex items-center gap-2">
                              <VenusAndMars className="size-4 text-muted-foreground" />

                              <SelectValue placeholder="Select gender" />
                            </div>
                          </SelectTrigger>

                          <SelectContent>
                            {["Male", "Female", "Other"].map((item) => (
                              <SelectItem value={item.toUpperCase()}>{item}</SelectItem>
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
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border border-orange-200/70 bg-orange-50/60 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <BriefcaseBusiness className="size-4" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Account credentials</h3>

                  <p className="text-xs leading-5 text-muted-foreground">
                    A temporary password and teacher code will be generated
                    automatically and sent to the instructor's email.
                  </p>
                </div>
              </div>
            </div>
          </FieldGroup>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t bg-muted/10 px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-10"
            onClick={onSuccess}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="h-10 bg-orange-500 px-5 text-white hover:bg-orange-600"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <BriefcaseBusiness className="mr-2 size-4" />
                Create Instructor
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateIntructorForm;
