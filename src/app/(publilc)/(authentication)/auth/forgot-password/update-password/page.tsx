


import React from "react";
import Link from "next/link";
import {

  KeyRound,
  
} from "lucide-react";


import Logo from '../../../../../../assets/Logo';
import UpdatePasswordFrom from '../../../../../../components/form/update-password-from'

export default function UpdatePasswordPage() {




  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-100px] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
        <Logo flexColRow='flex-row'/>
        </div>

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border bg-muted/50">
            <KeyRound className="size-7 text-orange-500" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Create a new password
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your identity has been verified. Set a new password for your
            UniSphere account.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-7">
       {/* From */}
       <UpdatePasswordFrom/>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-orange-500 transition-colors hover:text-orange-600"
          >
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}

