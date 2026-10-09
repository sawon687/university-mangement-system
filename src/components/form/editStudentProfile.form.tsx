
"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";

import { format, parseISO } from "date-fns";
import {
  CalendarDays,
  Loader2,
  MapPin,
  Phone,
  VenusAndMars,
} from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import z from 'zod'

import { IDepartment, IStudentProfile } from "../../type";
import { inputClass } from '../../utils/input-class';
import { Input } from '../ui/input';
import { useGetDepartment } from '../../hooks/department.hook';
import { toast } from '../ui/toast';
import { useStudentProfileUpdate } from '../../hooks/userProfileChagne.hook';
import { studentProfileValidationSchema } from '../../validation';
import { Spinner } from '../ui/spinner';
interface Props{
  onSuccess:()=> void
  editData:IStudentProfile
}
const EditStudentProfileForm = ({onSuccess,editData}:Props) => {


const {mutate:updateData,isPending}=useStudentProfileUpdate()
  const { data } = useGetDepartment("");
  console.log('data',data)
  const departments: IDepartment[] = data?.data ?? [];
  console.log('departmensts',departments)

 const form = useForm({
  defaultValues: {
    phone: editData.phone ?? "",
    gender: editData.gender ?? "",
    dateOfBirth: editData.dateOfBirth ?? "",
    address: editData.address ?? "",
    departmentId: editData.departmentId ?? "",
  },

  validators: {
    onSubmit: studentProfileValidationSchema,
  },

  onSubmit: ({ value }) => {
    updateData(value, {
      onSuccess: (res) => {
        toast.add({
          title: "Profile updated successfully",
          description: res.message,
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
            "Something went wrong",
          type: "error",
        });
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
      className="space-y-6"
    >
      {/* Form Heading */}
      <div className="space-y-1">
        <h3 className="text-base font-semibold tracking-tight">
          Personal Information
        </h3>

        <p className="text-sm text-muted-foreground">
          Update your contact details and academic information.
        </p>
      </div>

      <FieldGroup className="gap-5">
        {/* Phone and Address */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <form.Field name="phone">
            {(field) => {
              const invalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Phone Number
                  </FieldLabel>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="01XXXXXXXXX"
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  {invalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="address">
            {(field) => {
              const invalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Address
                  </FieldLabel>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter your address"
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  {invalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Date of Birth */}
        <form.Field name="dateOfBirth">
          {(field) => {
            const invalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>
                  Date of Birth
                </FieldLabel>

                <Popover>
                {field.state.value}
                  <PopoverTrigger
                    render={
                      <Button
                        id={field.name}
                        type="button"
                        variant="outline"
                        className="h-11 w-full justify-start gap-3 rounded-lg border-input bg-background px-3 text-left font-normal shadow-none hover:bg-muted/50"
                      >
                        <CalendarDays className="size-4 text-muted-foreground" />

                        <span
                          className={
                            field.state.value
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {field.state.value
                            ? format(parseISO(field.state.value), "PPP")
                            : "Select your date of birth"}
                        </span>
                      </Button>
                    }
                  />

                  <PopoverContent
                    align="start"
                    className="w-auto p-0"
                  >
                    <Calendar
                      mode="single"
                      selected={field.state.value ? parseISO(field.state.value) : undefined}
                      onSelect={(selectedDate) => {
                    

                        field.handleChange(
                          selectedDate
                            ? format(selectedDate, "yyyy-MM-dd")
                            : ""
                        );
                      }}
                      disabled={(day) => day > new Date()}
                      defaultMonth={field.state.value ? parseISO(field.state.value) : undefined}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                {invalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Department and Gender */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <form.Field name="departmentId">
            {(field) => {
              const invalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              const selectedDepartment = departments.find(
                (department) =>
                  department.id === field.state.value
              );

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Department
                  </FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value ?? "")
                    }
                  >
                    <SelectTrigger
                      id={field.name}
                      className={`${inputClass} w-full`}
                    >
                      <SelectValue placeholder="Select department">
                        {selectedDepartment?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {invalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="gender">
            {(field) => {
              const invalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Gender
                  </FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (
                        value === "MALE" ||
                        value === "FEMALE" ||
                        value === "OTHER"
                      ) {
                        field.handleChange(value);
                      }
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      className={`${inputClass} w-full`}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <VenusAndMars className="size-4 shrink-0 text-muted-foreground" />

                        <SelectValue placeholder="Select gender">
                          {field.state.value
                            ? field.state.value.charAt(0) +
                              field.state.value.slice(1).toLowerCase()
                            : undefined}
                        </SelectValue>
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      {["MALE", "FEMALE", "OTHER"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item.charAt(0) +
                            item.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {invalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>
      </FieldGroup>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-lg"
          disabled={isPending}
          onClick={() => {
            form.reset();
             
          }}
        >
          Reset
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-lg px-5"
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

export default EditStudentProfileForm;

