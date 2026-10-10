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
import { loginSchema } from "../../validation";
import { useLogin } from "../../hooks/auth.hook";
import { toast } from "../ui/toast";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, UserCheck, Wrench } from "lucide-react";
import { Spinner } from '../ui/spinner';
import { useRouter } from 'next/navigation';
import { inputClass } from '../../utils/input-class';

export function LoginForm() {
  const { mutate: login, isPending, isError } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "ni2474758@gmail.com",
      password: "dd&Ho^fKlKaI",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login success",
            description: "welcome Back",
            type: "success",
          });
          router.push('/');
        },

        onError: (error: any) => {
          setErrorMessage(error.data?.message || "login felad");
        },
      });
    },
  });

  // Demo Login Handler for 3 fixed roles
  const handleDemoLogin = (email: string, pass: string, roleName: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", pass);
    
    login(
      { email, password: pass },
      {
        onSuccess: () => {
          toast.add({
            title: `${roleName} Demo Login Success`,
            description: "Welcome Back",
            type: "success",
          });
          router.push('/');
        },
        onError: (error: any) => {
          setErrorMessage(error.data?.message || "Demo login failed");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const showBackendError =
                isError && errorMessage?.toLowerCase().includes("email");

              return (
                <Field data-invalid={isInvalid || showBackendError}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    onBlur={field.handleBlur}
                    placeholder="Enter your Email"
                    className={inputClass}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                  {showBackendError && (
                    <FieldError errors={[{ message: errorMessage }]} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const showBackendError =
                isError && errorMessage?.toLowerCase().includes("password");
              
              return (
                <Field data-invalid={isInvalid || showBackendError}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm text-primary underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      placeholder="Enter your Password"
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                    {showBackendError && (
                      <FieldError errors={[{ message: errorMessage }]} />
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : 'Login'}
          </Button>

          {/* 🚀 QUICK DEMO LOGIN BUTTONS */}
          <div className="space-y-2 pt-2">
            <div className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              🚀 Quick Demo Login
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs font-medium border-orange-500/30 hover:bg-orange-500/10"
                onClick={() => handleDemoLogin("sawon5555@gmail.com", "sawon@123S", "Admin")}
                disabled={isPending}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> 👨‍💼 Admin [Demo]
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs font-medium border-orange-500/30 hover:bg-orange-500/10"
                onClick={() => handleDemoLogin("sawon666@gmail.com", "sawon@123", "Student")}
                disabled={isPending}
              >
                <UserCheck className="w-3.5 h-3.5 text-orange-600" /> 👤 Student [Demo]
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="col-span-2 flex items-center gap-1.5 text-xs font-medium border-orange-500/30 hover:bg-orange-500/10"
                onClick={() => handleDemoLogin("jahid333@gmail.com", "dd&Ho^fKlKaI", "Instructor")}
                disabled={isPending}
              >
                <Wrench className="w-3.5 h-3.5 text-orange-600" /> 🛠️ Instructor [Demo]
              </Button>
            </div>
          </div>

          <FieldSeparator>Or continue with</FieldSeparator>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}