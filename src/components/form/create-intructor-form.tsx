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
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { inputClass } from "../../utils/input-class";

interface CreateInstructorFormProps {
  onSuccess?: () => void;
}

const CreateIntructorForm = ({
  onSuccess,
}: CreateInstructorFormProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      gender: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value);

      // API call এখানে করবে

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
                <h2 className="text-sm font-semibold">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the instructor's personal and contact details.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <form.Field name="name">
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name}>
                        Full Name
                      </FieldLabel>

                      <div className="relative">
                        <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id={field.name}
                          name={field.name}
                          placeholder="Md. Rahim Uddin"
                          value={field.state.value}
                          className={`h-10 pl-9 ${inputClass}`}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </div>
                    </Field>
                  )}
                </form.Field>

                {/* Email */}
                <form.Field name="email">
                  {(field) => (
                    <Field className="space-y-2">
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
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </div>
                    </Field>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4 border-t pt-5">
              <div>
                <h2 className="text-sm font-semibold">
                  Academic Information
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Assign the instructor to a department and specify their
                  gender.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Department */}
                <form.Field name="department">
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name}>
                        Department
                      </FieldLabel>

                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(value)
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          className="h-10 w-full"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="size-4 text-muted-foreground" />

                            <SelectValue placeholder="Select department" />
                          </div>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="cse">
                            Computer Science & Engineering
                          </SelectItem>

                          <SelectItem value="eee">
                            Electrical & Electronic Engineering
                          </SelectItem>

                          <SelectItem value="bba">
                            Business Administration
                          </SelectItem>

                          <SelectItem value="english">
                            English
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </form.Field>

                {/* Gender */}
                <form.Field name="gender">
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name}>
                        Gender
                      </FieldLabel>

                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(value)
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
                          <SelectItem value="male">
                            Male
                          </SelectItem>

                          <SelectItem value="female">
                            Female
                          </SelectItem>

                          <SelectItem value="other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
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
                  <h3 className="text-sm font-semibold">
                    Account credentials
                  </h3>

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
            className="h-10 bg-orange-500 px-5 text-white hover:bg-orange-600"
          >
            <BriefcaseBusiness className="mr-2 size-4" />
            Create Instructor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateIntructorForm;