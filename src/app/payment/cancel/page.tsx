"use client";

import React from "react";
import Link from "next/link";
import { XCircle, RefreshCcw, ArrowLeft, HelpCircle } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card className="border-border/60 shadow-xl bg-card">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-orange-500/10 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-orange-500/5">
              <XCircle className="w-10 h-10" />
            </div>
            <Badge variant="outline" className="w-fit mx-auto mb-2 text-orange-600 border-orange-500/30">
              Transaction Aborted
            </Badge>
            <CardTitle className="text-2xl font-bold tracking-tight">Payment Cancelled</CardTitle>
            <CardDescription className="text-sm mt-1">
              Your payment process was interrupted or cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-xl text-xs space-y-2 border border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference ID:</span>
                <span className="font-mono font-medium">AGU-TXN-984210</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attempt Time:</span>
                <span className="font-medium">Oct 10, 2026 - 09:32 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-orange-600 font-semibold">Cancelled by User</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              If you faced any technical issues during checkout, please try again or contact the university finance desk for assistance.
            </p>
          </CardContent>

          <Separator className="my-2" />

          <CardFooter className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold">
              <Link href="/checkout">
                <RefreshCcw className="w-4 h-4 mr-2" /> Try Payment Again
              </Link>
            </Button>

            <div className="flex items-center justify-between w-full gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="flex-1 text-muted-foreground hover:text-foreground">
                <Link href="/support">
                  <HelpCircle className="w-4 h-4 mr-2" /> Support
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}