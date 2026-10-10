import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Compass, BookOpen } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* 404 Header Badge */}
        <div className="mb-4 flex justify-center">
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-500/30 px-3.5 py-1 text-xs uppercase tracking-widest font-semibold gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" /> Error 404
          </Badge>
        </div>

        {/* Big Animated/Styled Number */}
        <h1 className="text-8xl md:text-9xl font-black tracking-extratight text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-amber-600 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4">
          Page Lost in Campus
        </h2>

        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          The page you are looking for might have been moved, renamed, or
          doesn't exist on the Apex Global University portal.
        </p>

        {/* Search Bar to Find Pages */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search programs, admissions, faculty..."
              className="pl-10 pr-24 py-5 bg-card border-border/80 text-sm placeholder:text-muted-foreground rounded-full shadow-sm focus-visible:ring-orange-500"
            />
            <Button
              size="sm"
              className="absolute right-1.5 rounded-full px-4 bg-orange-600 hover:bg-orange-500 text-white text-xs"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          <Card className="border-border/60 hover:border-orange-500/50 transition bg-card/60 backdrop-blur">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 text-orange-600 rounded-lg shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs">Academic Programs</h4>
                <p className="text-[11px] text-muted-foreground">
                  Explore faculties & degrees
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 hover:border-orange-500/50 transition bg-card/60 backdrop-blur">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 text-orange-600 rounded-lg shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs">Admissions Portal</h4>
                <p className="text-[11px] text-muted-foreground">
                  Requirements & deadline
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md px-8 bg-orange-600 hover:bg-orange-500 text-white font-semibold"
          >
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <Link
            href="javascript:history.back()"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border px-8 hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Previous Page
          </Link>
        </div>
      </div>
    </div>
  );
}
