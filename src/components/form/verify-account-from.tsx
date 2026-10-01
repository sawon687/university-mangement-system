"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

import { useVerify } from "../../hook/auth.hook";

const RESEND_COOLDOWN = 60;

const otpInputClass =
  "size-14 rounded-xl border-2 bg-background p-0 text-center text-xl font-semibold shadow-sm transition-all " +
  "data-[active=true]:border-primary " +
  "data-[active=true]:ring-2 " +
  "data-[active=true]:ring-primary " +
  "data-[active=true]:outline-none";

interface VerifyFormProps {
  title?: string;
  description?: string;
  successRedirect?: string;
  buttonText?: string;
  purpose: string;
}

const VerifyFrom = ({
  title,
  description,
  successRedirect = "/",
  buttonText,
  purpose,
}: VerifyFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verify, isPending } = useVerify();

  const form = useForm({
    defaultValues: {
      otp: "",
      email,
    },

    onSubmit: ({ value }) => {
      handleOtp(value.otp);
    },
  });

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [resendTimer]);

  const handleOtp = (otp: string) => {
    const verifyData = {
      otp,
      email,
      purpose,
    };

    verify(verifyData, {
      onSuccess: (res: any) => {

        if (!res.success) {
          toast.add({
            title: "Verification Failed",
            description:
              res.message || "Verification failed. Please try again.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Verification Successful",
          description: res.message,
          type: "success",
        });
        const token = res.data.token;
        const params = new URLSearchParams({ email, token });
        console.log("succss url", params, "url succss", successRedirect);
        const url =
          successRedirect === "/auth/forgot-password/update-password"
            ? `${successRedirect}?${params.toString()}`
            : successRedirect;

        router.push(url);
      },

      onError: (err: any) => {
    

        toast.add({
          title: "Verification Failed",
          description:
            err?.data?.message ||
            err?.response?.data?.message ||
            "Invalid or expired verification code.",
          type: "error",
        });
      },
    });
  };

  const handleResend = () => {
    if (resendTimer > 0 || isPending) {
      return;
    }

    // Add your resend mutation here
    console.log("Resend verification code to:", email);

    setResendTimer(RESEND_COOLDOWN);

    toast.add({
      title: "Code Sent",
      description: "A new verification code has been sent to your email.",
      type: "success",
    });
  };

  if (!email) {
    return null;
  }

  const minutes = Math.floor(resendTimer / 60);
  const seconds = String(resendTimer % 60).padStart(2, "0");

  return (
    <>
      {/* Heading */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

        <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {/* OTP Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="otp"
          validators={{
            onSubmit: ({ value }) => {
              if (value.length !== 6) {
                return "Please enter the 6-digit verification code";
              }

              if (!/^\d+$/.test(value)) {
                return "Verification code must contain only digits";
              }

              return undefined;
            },
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-isvalid={isInvalid} className="mt-9">
                <FieldLabel
                  htmlFor={field.name}
                  className={`flex justify-center ${
                    isInvalid ? "text-destructive" : ""
                  }`}
                >
                  Verification Code
                </FieldLabel>

                <div className="mt-3 flex justify-center">
                  <InputOTP
                    id={field.name}
                    maxLength={6}
                    inputMode="numeric"
                    value={field.state.value}
                    onChange={(value) => {
                      field.handleChange(value);
                    }}
                    onBlur={field.handleBlur}
                    disabled={isPending}
                  >
                    <InputOTPGroup className="gap-2.5">
                      <InputOTPSlot index={0} className={otpInputClass} />

                      <InputOTPSlot index={1} className={otpInputClass} />

                      <InputOTPSlot index={2} className={otpInputClass} />

                      <div className="w-2" />

                      <InputOTPSlot index={3} className={otpInputClass} />

                      <InputOTPSlot index={4} className={otpInputClass} />

                      <InputOTPSlot index={5} className={otpInputClass} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {isInvalid && field.state.meta.errors.length > 0 && (
                  <FieldError className="mt-2 justify-center text-center">
                    {field.state.meta.errors.join(", ")}
                  </FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Verify Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="mt-8 h-12 w-full rounded-xl text-sm font-medium shadow-sm"
        >
          {isPending ? (
            <>
              <Spinner fontSize="20px" />
              Verifying...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>

      {/* Resend */}
      <div className="mt-7 space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={resendTimer > 0 || isPending}
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline"
        >
          {resendTimer > 0
            ? `Resend code in ${minutes}:${seconds}`
            : "Resend verification code"}
        </button>
      </div>

      {/* Expiry / Information */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        For your security, verification codes can only be used once.
      </p>
    </>
  );
};

export default VerifyFrom;
