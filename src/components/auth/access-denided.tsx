"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AccessDenied() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Radial Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Card className="max-w-md w-full border-border/60 shadow-xl bg-card/80 backdrop-blur relative z-10 text-center">
        <CardHeader className="pb-4">
          {/* Shield Alert Icon Container */}
          <div className="w-16 h-16 bg-red-500/10 text-red-600 dark:text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="mb-2 flex justify-center">
            <Badge variant="outline" className="text-red-600 border-red-500/30 px-3 py-1 text-xs uppercase tracking-wider font-semibold gap-1.5">
              <Lock className="w-3 h-3" /> 403 Forbidden
            </Badge>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Access Denied
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed">
            You do not have the required permissions or role to view this page. If you believe this is an error, please contact your administrator.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
          >
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <Button
            variant="outline"
            className="w-full border-border hover:bg-accent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}