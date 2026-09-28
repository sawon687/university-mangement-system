"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "../ui/toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from '../../validation';
import { useRegister } from '../../hook/auth.hook';
import { isValid } from 'zod/v3';
import { Spinner } from '../ui/spinner';

const inputClass =
  "border-2 focus:border-primary focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
const {mutate:register,isPending,isError}=useRegister()
  const form = useForm({
    defaultValues: {
      name: "sawon",
      email: "ni2474758@gmail.com",
      password: "sawon@123",
      phone: "01776079464",
      confirmPassword: "sawon@123",
    },

    validators: {
      onSubmit:registerSchema,
    },

    onSubmit: ({ value }) => {
      console.log("data loin", value);

      const registerData = {
        email: value.email,
        password: value.password,
        name:value.name,
        phone:value.phone
      };

      register(registerData, {
        onSuccess: (res) => {
          console.log("response result", res);
            
          toast.add({
            title: "Register success",
            description: res.message,
            type: "success",
          });
        },

        onError: (error: any) => {
          console.log("erros", error.data);
         
          toast.add({
            title: "Register feild",
            description:error.data.message||error.errors.message,
            type: "Error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Create your student account</h1>

        <p className="text-sm  text-muted-foreground">
          Enter your information below to create your student account
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log("submit");
          await form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
                
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>

                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    placeholder="Enter your email address"
                    className={inputClass}
                    type="email"
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Phone{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </FieldLabel>

                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    placeholder="Enter your phone number"
                    className={inputClass}
                    type="tel"
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Create a password"
                      className={inputClass}
                      onBlur={field.handleBlur}
                      type={showPassword ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="absolute top-2 right-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                  </div>

                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

           <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-isvalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Input
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Confirm a password"
                      className={inputClass}
                      onBlur={field.handleBlur}
                      type={showPassword ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="absolute top-2 right-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                  </div>
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>



          <Button disabled={isPending} type="submit">{isPending?<><Spinner/></>:'Create Student Account'}</Button>

          <FieldSeparator>Or continue with</FieldSeparator>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

