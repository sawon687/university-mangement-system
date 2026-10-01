import { GraduationCap } from "lucide-react";
import React from "react";
import { LoginForm } from "../../../../../components/form/login-from";
import Link from "next/link";
import Logo from '../../../../../assets/Logo';

const loginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex  justify-center gap-2 md:justify-start">
         <Logo flexColRow='flex-row'/>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative hidden overflow-hidden p-4 lg:flex">
        <div className="group relative h-full w-full overflow-hidden rounded-2xl">
          {/* Animated Image */}
          <img
            src="/login.png"
            alt="Education"
            className="
              absolute inset-0
              h-full w-full
              object-cover
              animate-slow-zoom
              transition-transform duration-700
              group-hover:scale-105
            "
          />

          {/* Gradient Overlay */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/85
              via-black/30
              to-black/5
            "
          />

          {/* Soft Animated Glow */}
          <div
            className="
              absolute -right-24 -top-24
              size-80
              rounded-full
              bg-primary/10
              blur-3xl
              animate-float-glow
            "
          />

          {/* Text */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-10 text-white">
            <p
              className="
                mb-3
                text-sm
                font-medium
                uppercase
                tracking-[0.25em]
                text-primary
              "
            >
              University Management
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Learn. Grow. Succeed.
            </h1>

            <p className="mt-4 max-w-md text-base leading-7 text-white/80">
              Build your future with quality education and endless
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
