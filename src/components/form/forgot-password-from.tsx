"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useForgotPassword } from "../../hook/auth.hook";
import { forgotPasswordSchema } from '../../validation';
import { useRouter } from 'next/navigation';




const ForgotPasswordFrom = () => {
  const { mutate: forgotEmail, isPending,isError } = useForgotPassword();
 const router=useRouter()
  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onChange: forgotPasswordSchema,
    },

    onSubmit: ({ value }) => {
      forgotEmail(value.email, {
        onSuccess: (res) => {
          console.log("response forgot", res);

          toast.add({
            title: "Forgot password",
            description: res.message,
            type: "success",
          });
          const params=new URLSearchParams({email:value.email})
          router.push(`/auth/forgot-password/verify?${params}`)
        },

        

        onError: (err: any) => {
          console.log("error", err);

          toast.add({
            title: "Forgot password",
            description:
              err?.data?.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-1 items-center">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="mb-7 flex size-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
          <KeyRound className="size-7 text-primary" />
        </div>

        {/* Heading */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Account Recovery
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Forgot Password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Enter your email address and we'll send you a verification code to
            securely reset your password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="mt-8 space-y-5"
        >
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email Address
                  </FieldLabel>

                  <div className="group relative">
                    <Mail
                      className="
                        pointer-events-none
                        absolute left-3.5 top-1/2
                        size-4 -translate-y-1/2
                        text-muted-foreground
                        transition-colors
                        group-focus-within:text-primary
                      "
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      onBlur={field.handleBlur}
                      placeholder="you@example.com"
                      className="
                        h-12 rounded-xl
                        bg-muted/20
                        pl-10
                        transition-all
                        focus-visible:border-primary/50
                        focus-visible:bg-background
                        focus-visible:ring-4
                        focus-visible:ring-primary/10
                      "
                    />
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}

                  <FieldDescription className="text-xs">
                    We'll send a verification code to this email address.
                  </FieldDescription>
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={!form.state.canSubmit || isPending}
            className="
              group
              h-12 w-full
              rounded-xl
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                Send Verification Code
                <ArrowRight
                  className="
                    ml-1 size-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </>
            )}
          </Button>
        </form>

        {/* Login */}
        <div className="mt-7 text-center">
          <span className="text-sm text-muted-foreground">
            Remember your password?{" "}
          </span>

          <Link
            href="/auth/login"
            className="
              text-sm font-semibold text-primary
              transition-colors
              hover:text-primary/80
            "
          >
            Back to Login
          </Link>
        </div>

        {/* Security */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border bg-muted/30 p-3.5">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

          <p className="text-xs leading-5 text-muted-foreground">
            Your account security matters. Never share your verification code
            with anyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordFrom;