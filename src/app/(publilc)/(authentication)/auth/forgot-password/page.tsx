import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import Logo from "../../../../../assets/Logo";
import ForgotPasswordFrom from '../../../../../components/form/forgot-password-from';


const ForgotPasswordPage = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div className="relative flex flex-col gap-5 px-6 py-8 sm:px-10 lg:px-16 xl:px-24">
          {/* Logo */}
          <Logo flexColRow="flex-row" />

          {/* Form */}
            <ForgotPasswordFrom/>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div
          className="
            relative hidden overflow-hidden
            rounded-xl
            bg-gradient-to-br
            from-primary/10
            via-orange-50
            to-background
            lg:flex
          "
        >
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 size-80 rounded-full bg-primary/10 blur-3xl" />

          {/* Right Content */}
          <div className="relative flex w-full flex-col items-center px-12 pt-20 text-center xl:pt-24">
            {/* Illustration */}
            <div className="relative mb-10 flex size-64 items-center justify-center">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border border-primary/10 bg-white/60 shadow-sm" />

              {/* Middle circle */}
              <div className="absolute inset-7 rounded-full border border-primary/10 bg-primary/5" />

              {/* Main lock */}
              <div
                className="
                  relative flex size-32
                  flex-col items-center justify-center
                  rounded-3xl
                  border border-primary/15
                  bg-background
                  shadow-[0_18px_45px_-15px_rgba(249,115,22,0.3)]
                "
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <LockKeyhole className="size-7" />
                </div>

                <div className="mt-3 flex gap-1">
                  <span className="size-1.5 rounded-full bg-primary/40" />
                  <span className="size-1.5 rounded-full bg-primary/60" />
                  <span className="size-1.5 rounded-full bg-primary" />
                </div>
              </div>

              {/* Mail */}
              <div className="absolute right-3 top-8 flex size-11 items-center justify-center rounded-xl border bg-background shadow-md">
                <Mail className="size-5 text-primary" />
              </div>

              {/* Shield */}
              <div className="absolute bottom-7 left-2 flex size-11 items-center justify-center rounded-xl border bg-background shadow-md">
                <ShieldCheck className="size-5 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Secure & Simple
              </p>

              <h2 className="text-2xl font-bold tracking-tight xl:text-3xl">
                Get back into your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We'll help you securely recover your UniSphere account using a
                quick verification code sent to your email.
              </p>
            </div>

            {/* Brand */}
            <div className="mt-8">
              <p className="text-sm font-semibold">
                <span className="text-primary">U</span>nSphere
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Your University. Your Future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
