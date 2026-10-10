"use client";

import { useForm } from "@tanstack/react-form";
import { format, parseISO, isValid } from "date-fns";
import { z } from "zod";
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  Phone,
  UserRound,
  VenusAndMars,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

import { useGetDepartment } from "../../hooks/department.hook";
import { inputClass } from "../../utils/input-class";
import { useInstrutorProfileUpdate } from "../../hooks/instructorProfile.hook";
import { instructorProfileSchema } from "../../validation";
import { instructorProfile } from '../../type';


interface Props {
 editData: instructorProfile;
  onSuccess: () => void;
}

const getDateValue = (value: unknown) => {
  if (!(typeof value === "string" || value instanceof Date)) return "";
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);

  if (!isValid(date)) return "";

  return format(date, "yyyy-MM-dd");
};

const EditInstructorProfileForm = ({editData, onSuccess }: Props) => {
  const { mutate: updateData, isPending } = useInstrutorProfileUpdate();
  const { data: departmentResponse, isLoading: departmentsLoading } =
    useGetDepartment("");

  const departments = departmentResponse?.data ?? [];

  const form = useForm({
    defaultValues: {
      phone:editData.phone ?? "",
      gender:editData.gender ?? "",
      dateOfBirth: getDateValue(editData.dateOfBirth),
      address:editData.address?? "",
      departmentId:editData.department.id ?? "",
      designation:editData.designation ?? "",
      bio:editData.bio ?? "",
      specialization:editData.specialization ?? "",
      qualification:editData.qualification ?? "",
      experience:String(editData.experience)?? "",
    } as z.input<typeof instructorProfileSchema> & { departmentId: string },
    validators: {
      onSubmit: instructorProfileSchema,
    },

  
    onSubmit: ({ value }) => {

  const updateProfileData={
              phone: value.phone ?? "",
      gender: value.gender ?? "",
      dateOfBirth: getDateValue(value.dateOfBirth),
      address: value.address ?? "",
      departmentId: value.departmentId ?? "",
      designation: value.designation ?? "",
      bio:value.bio ?? "",
      specialization:value.specialization ?? "",
      qualification:value.qualification ?? "",
      experience:String(value.experience) ?? "",
    }
      updateData(updateProfileData, {
        onSuccess: (res: { message?: string }) => {
          toast.add({
            title: "Profile updated successfully",
            description: res?.message ?? "Your profile has been updated.",
            type: "success",
          });

          onSuccess();
        },
        onError: (error: any) => {
          toast.add({
            title: "Profile update failed",
            description:
              error?.data?.message ??
              error?.errors?.message ??
              error?.message ??
              "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-full min-h-0 flex-col gap-3 overflow-hidden"
    >
      {/* Account information */}{" "}
      <section className="space-y-4">
        {" "}
        <div className="flex items-center gap-2 border-b pb-3">
          {" "}
          <UserRound className="size-5 text-primary" />{" "}
          <div>
            {" "}
            <h3 className="font-semibold">Account Information</h3>{" "}
            <p className="text-sm text-muted-foreground">
              Your instructor identification.{" "}
            </p>{" "}
          </div>{" "}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Teacher Code</FieldLabel>
            <Input
              value={String(editData?.teacherCode ?? "")}
              readOnly
              className={`${inputClass} bg-muted`}
            />
            <p className="text-xs text-muted-foreground">
              Teacher code cannot be changed here.
            </p>
          </Field>

          <form.Field name="departmentId">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const selectedDepartment = departments.find(
                (department: { id: string }) =>
                  department.id === field.state.value,
              );

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel>Department *</FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value ?? "")}
                    disabled={departmentsLoading}
                  >
                    <SelectTrigger className={`${inputClass} w-full`}>
                      <SelectValue
                        placeholder={
                          departmentsLoading
                            ? "Loading departments..."
                            : "Select department"
                        }
                      >
                        {selectedDepartment?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {departments.map(
                        (department: {
                          id: string;
                          name: string;
                          code?: string;
                        }) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                            {department.code ? ` (${department.code})` : ""}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>

                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
      </section>
      {/* Personal information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <UserRound className="size-5 text-primary" />
          <div>
            <h3 className="font-semibold">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your contact and personal details.
            </p>
          </div>
        </div>

        <FieldGroup className="gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="phone">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Phone Number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="tel"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="01XXXXXXXXX"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="gender">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Gender</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (
                          value === "MALE" ||
                          value === "FEMALE" ||
                          value === "OTHER" ||
                          value === ""
                        ) {
                          field.handleChange(value);
                        }
                      }}
                    >
                      <SelectTrigger className={`${inputClass} w-full`}>
                        <div className="flex items-center gap-2">
                          <VenusAndMars className="size-4 text-muted-foreground" />
                          <SelectValue placeholder="Select gender" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="dateOfBirth">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const selectedDate = field.state.value
                ? parseISO(String(field.state.value)??'')
                : undefined;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel>Date of Birth</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          className={`${inputClass} w-full justify-start text-left font-normal`}
                        >
                          <CalendarDays className="mr-2 size-4 text-muted-foreground" />
                          {selectedDate && isValid(selectedDate)
                            ? format(selectedDate, "PPP")
                            : "Select date of birth"}
                        </Button>
                      }
                    />
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          selectedDate && isValid(selectedDate)
                            ? selectedDate
                            : undefined
                        }
                        defaultMonth={
                          selectedDate && isValid(selectedDate)
                            ? selectedDate
                            : undefined
                        }
                        disabled={(day) => day > new Date()}
                        onSelect={(date) =>
                          field.handleChange(
                            date ? format(date, "yyyy-MM-dd") : "",
                          )
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="address">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel>Address</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Textarea
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter your present address"
                      className={`${inputClass} min-h-20 pl-9`}
                    />
                  </div>
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </section>
      {/* Professional information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <BriefcaseBusiness className="size-5 text-primary" />
          <div>
            <h3 className="font-semibold">Professional Information</h3>
            <p className="text-sm text-muted-foreground">
              Share your current position and expertise.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="designation">
            {(field) => (
              <Field>
                <FieldLabel>Designation</FieldLabel>
                <Input
                  value={String(field.state.value)}
                  onChange={(event) =>
                    field.handleChange(event.target.value ?? "")
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. Assistant Professor"
                  className={inputClass}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="experience">
            {(field) => (
              <Field>
                <FieldLabel>Experience</FieldLabel>
                <Input
                  value={String(field.state.value)}
                  onChange={(event) =>
                    field.handleChange(String(event.target.value) ?? "")
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 5 years"
                  className={inputClass}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="specialization">
            {(field) => (
              <Field>
                <FieldLabel>Specialization</FieldLabel>
                <Input
                  value={String(field.state.value)}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. Software Engineering"
                  className={inputClass}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="qualification">
            {(field) => (
              <Field>
                <FieldLabel>Qualification</FieldLabel>
                <Input
                 value={String(field.state.value)}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. MSc in Computer Science"
                  className={inputClass}
                />
              </Field>
            )}
          </form.Field>
        </div>

        <form.Field name="bio">
          {(field) => (
            <Field>
              <FieldLabel>Professional Bio</FieldLabel>
              <Textarea
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Write a short introduction about yourself..."
                className={`${inputClass} min-h-28`}
              />
              <p className="text-xs text-muted-foreground">
                Maximum 1000 characters.
              </p>
            </Field>
          )}
        </form.Field>
      </section>
      {/* Form actions */}
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-lg"
          disabled={isPending}
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button
          type="submit"
          className="h-10 rounded-lg px-5"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditInstructorProfileForm;
