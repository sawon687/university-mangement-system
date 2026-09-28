
import { GraduationCap } from "lucide-react";
import React from "react";
import Link from "next/link";
import { RegisterForm } from "../../../../../components/form/register-form";

const registerPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="#"
            className="flex items-center gap-1 font-medium"
          >
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </div>

            <p>
              <span className="text-primary">U</span>nSphere
            </p>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative hidden overflow-hidden p-4 lg:flex">
        <div className="group relative h-full w-full overflow-hidden rounded-2xl border bg-muted shadow-2xl">
          {/* Image */}
          <img
            src="/register.png"
            alt="University students"
            className="
              absolute inset-0
              h-full w-full
              scale-105
              object-cover
              transition-transform
              duration-[1500ms]
              ease-out
              group-hover:scale-110
              animate-slow-zoom
            "
          />

          {/* Main Gradient */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/90
              via-black/40
              to-black/5
            "
          />

          {/* Top Glow */}
          <div
            className="
              absolute -right-20 -top-20
              size-72
              rounded-full
              bg-primary/20
              blur-3xl
              transition-all
              duration-1000
              group-hover:translate-x-10
              group-hover:translate-y-10
            "
          />

          {/* Bottom Glow */}
          <div
            className="
              absolute -bottom-20 -left-20
              size-72
              rounded-full
              bg-primary/10
              blur-3xl
            "
          />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10">
            {/* Badge */}
            <div
              className="
                mb-5
                inline-flex
                items-center
                rounded-full
                border
                border-white/20
                bg-white/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              <span className="mr-2 size-1.5 animate-pulse rounded-full bg-primary" />
              University Management System
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Learn.
              <span className="text-primary"> Grow.</span>
              <br />
              Succeed.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 md:text-base">
              Build your future with quality education, meaningful
              connections, and endless opportunities. Everything you need
              to manage your academic journey in one place.
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div
                className="
                  rounded-xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <p className="text-lg font-semibold text-white">
                  Smart
                </p>
                <p className="text-xs text-white/60">
                  Learning
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <p className="text-lg font-semibold text-white">
                  Secure
                </p>
                <p className="text-xs text-white/60">
                  Platform
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <p className="text-lg font-semibold text-white">
                  Connected
                </p>
                <p className="text-xs text-white/60">
                  Community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerPage;


