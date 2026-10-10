'use client'
import React from "react";
import { Loader2, GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Gradient & Radial Blur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Animated Brand Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg shadow-orange-500/5">
            <GraduationCap className="w-8 h-8 animate-pulse" />
          </div>
          
          {/* Outer Rotating Loader Ring */}
          <div className="absolute -inset-2">
            <Loader2 className="w-20 h-20 text-orange-600/30 animate-spin" />
          </div>
        </div>

        {/* Loading Text & Status */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Loading Portal...
          </h3>
          <p className="text-xs text-muted-foreground animate-pulse">
            Fetching academic resources and data, please wait.
          </p>
        </div>

        {/* Skeleton Progress Bar Accent */}
        <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-1/2 animate-[shimmer_1.5s_infinite] translate-x-[-100%]" 
               style={{
                 animation: "loading-bar 1.5s infinite ease-in-out"
               }} 
          />
        </div>
      </div>

      {/* Inline Animation Style for Progress Bar */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            left: 35%;
            width: 60%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
}