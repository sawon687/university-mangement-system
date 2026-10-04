"use client";

import { Skeleton } from "../../ui/skeleton";

export default function ProgramListSkeleton() {
  return (
    <div className="divide-y">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="p-5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            {/* Program info */}
            <div className="flex min-w-0 flex-1 items-start gap-4">
              {/* Icon */}
              <Skeleton className="size-11 shrink-0 rounded-lg" />

              <div className="min-w-0 flex-1 space-y-2">
                {/* Name + Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                {/* Degree + Department */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="size-1 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* Description */}
                <Skeleton className="mt-2 h-4 w-full max-w-md" />
              </div>
            </div>

            {/* Program stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 lg:w-[430px] lg:shrink-0">
              {/* Duration */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Credits */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-10" />
              </div>

              {/* Semester */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-10" />
              </div>

              {/* Total Fee */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            {/* Actions */}
            <Skeleton className="size-9 shrink-0 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}