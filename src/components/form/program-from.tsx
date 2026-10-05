"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, DollarSign, Layers, Clock } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { inputClass } from "../../utils/input-class";

import { useProgram } from "../../hooks/program.hook";
import { useGetDepartment } from "../../hooks/department.hook";
import { IDepartment } from "../../type";
import { programSchema } from "../../validation";
import { toast } from "../ui/toast";
import { Spinner } from '../ui/spinner';

const ProgramFrom = () => {
  const { mutate: createProgram, isPending } = useProgram();
  const { data } = useGetDepartment("");
  const departments = data?.data;
  console.log("departments", departments);
  const form = useForm({
    defaultValues: {
      departmentId: "",
      name: "",
      degreeType: "BSC",
      duration: 4,
      totalCredits: 140,
      semester: 8,
      semesterType: "BI_SEMESTER",
      description: "",
      admissionFee: 10000,
      tuitionFee: 50000,
      perCreditFee: 3000,
      totalFee: 150000,
      isActive: true,
    } as z.input<typeof programSchema>,
    validators: {
      onSubmit: programSchema,
    },
    onSubmit: ({ value }) => {
      const programdata = {
        departmentId: value.departmentId,
        name: value.name,
        degreeType: value.degreeType,
        duration: Number(value.duration),
        totalCredits: Number(value.totalCredits),
        semester: Number(value.semester),
        semesterType: value.semesterType,
        description: value.description,
        admissionFee: Number(value.admissionFee),
        tuitionFee: Number(value.tuitionFee),
        perCreditFee: 3000,
        totalFee: Number(value.totalFee),
        isActive: true,
      };
console.log('programdata',programdata)
      createProgram(programdata, {
        onSuccess: (res) => {
          toast.add({
            title: "Program  success",
            description: res.message,
            type: "success",
          });
        },

        onError: (error: any) => {
          console.log("erros", error.data);

          toast.add({
            title: "Program feild",
            description: error.data.message || error.errors.message,
            type: "Error",
          });
        },
      });
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
      <div className="mb-6 border-b border-border/60 pb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Program Details Form
        </h2>
        <p className="text-xs text-muted-foreground">
          Fill in the information below to add or update a university program.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Grid Section 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Program Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Program Name</FieldLabel>
                  <Input
                    name={field.name}
                    id={field.name}
                    value={String(field.state.value ?? "")}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="e.g. B.Sc. in Computer Science & Engineering"
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Department Selection */}
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Grid Section 2: Degree & System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Degree Type */}
          <form.Field name="degreeType">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Degree Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(
                        value as z.input<typeof programSchema>["degreeType"],
                      )
                    }
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                         ["BSC", "MSC", "BA", "BBA", "MBA"].map(value=>(
                              <SelectItem value={value}>{value}</SelectItem>
                         ))
                      }
                     
                    
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          </form.Field>

          {/* Semester Type */}
          <form.Field name="semesterType">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Semester Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value??'TRI_SEMESTER')
                    }
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select System" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { value: "BI_SEMESTER", label: "Semester (2 terms)" },
                        { value: "TRI_SEMESTER", label: "Trimester (3 terms)" },
                      ].map((sem) => (
                        <SelectItem value={sem.value}>{sem.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          </form.Field>

          {/* Duration (Years) */}
          <form.Field name="duration">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Duration (Years)</FieldLabel>
                  <Input
                    name={field.name}
                    id={field.name}
                    value={Number(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="Duration"
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Grid Section 3: Credits & Semesters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="totalCredits">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Total Credits</FieldLabel>
                  <Input
                    name={field.name}
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="Total Credits"
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="semester">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name}>Total Semesters</FieldLabel>
                  <Input
                    name={field.name}
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="Total Semesters"
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Grid Section 4: Fees Structure */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-4 rounded-xl border border-border/40">
          <form.Field name="admissionFee">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1">
                  <FieldLabel htmlFor={field.name}>Admission Fee</FieldLabel>
                  <Input
                    name={field.name}
                    type="number"
                    id={field.name}
                    value={Number(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="tuitionFee">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-isvalid={isInvalid} className="space-y-1">
                  <FieldLabel htmlFor={field.name}>Tuition Fee</FieldLabel>
                  <Input
                    name={field.name}
                    type="number"
                    id={field.name}
                    value={Number(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="perCreditFee">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="space-y-1">
                  <FieldLabel>Per Credit Fee</FieldLabel>
                  <Input
                    type="number"
                    value={Number(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="totalFee">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="space-y-1">
                  <FieldLabel>Total Estimated Fee</FieldLabel>
                  <Input
                    type="number"
                    value={Number(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            return (
              <Field className="space-y-1.5">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  placeholder="Write short details about the program..."
                  value={field.state.value}
                  name={field.name}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                />
              </Field>
            );
          }}
        </form.Field>

        {/* Is Active Checkbox */}
        <form.Field name="isActive">
          {(field) => (
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isActive"
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.handleChange(Boolean(checked))
                }
              />
              <FieldLabel
                htmlFor="isActive"
                className="text-xs font-medium leading-none cursor-pointer"
              >
                Active Program (Visible to students and admission portals)
              </FieldLabel>
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border/60">
          <Button disabled={isPending} type="submit">{isPending?<><Spinner/></>:'Create Program'}</Button>

        </div>
      </form>
    </div>
  );
};

export default ProgramFrom;
