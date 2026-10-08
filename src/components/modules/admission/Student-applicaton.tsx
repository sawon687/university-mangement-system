"use client";

import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  User,
  XCircle,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";

import { useGetAdmission } from "../../../hooks/admission-application.hook";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type FileResult = {
  url: string;
  publicId: string;
};

const StudentApplicaton = () => {
  const { data, isLoading } = useGetAdmission();

  const application = data?.data ?? null;

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  /* ---------------- Empty ---------------- */

  if (!application) {
    return (
      <Card className="mx-auto max-w-2xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-orange-50 p-4">
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
          <h2 className="text-lg font-semibold">
            No Admission Application Found
          </h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            You have not submitted an admission application yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  /* ---------------- Status ---------------- */

  const statusConfig = {
    PENDING: {
      label: "Pending Review",
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
    },
    APPROVED: {
      label: "Approved",
      icon: CheckCircle2,
      className:
        "border-green-200 bg-green-50 text-green-700 hover:bg-green-50",
    },
    REJECTED: {
      label: "Rejected",
      icon: XCircle,
      className: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
    },
  };

  const currentStatus =
    statusConfig[application.status as keyof typeof statusConfig] ??
    statusConfig.PENDING;

  const StatusIcon = currentStatus.icon;

  /* ---------------- Document Renderer ---------------- */

  const renderDocument = (
    title: string,
    document: FileResult | null | undefined,
  ) => {
    if (!document) {
      return (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-muted p-2.5">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">
                No document uploaded
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const isPdf =
      document.url.includes("/raw/upload/") ||
      document.url.toLowerCase().includes(".pdf");

    return (
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-lg bg-orange-100 p-2.5">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="mt-0.5">
                {isPdf ? "PDF Document" : "Image Document"}
              </CardDescription>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0">
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              Open
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          {isPdf ? (
            <div className="h-80 w-full bg-muted">
              <iframe
                src={document.url}
                title={title}
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex min-h-60 items-center justify-center bg-muted/50 p-4">
              <img
                src={document.url}
                alt={title}
                className="max-h-80 max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
      {/* ================= Header ================= */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-orange-100 p-3.5 text-orange-600">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                My Admission Application
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                View your application details and submitted academic documents
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`w-fit gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${currentStatus.className}`}
          >
            <StatusIcon className="h-4 w-4" />
            {currentStatus.label}
          </Badge>
        </CardContent>
      </Card>

      {/* ================= Student Information ================= */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-orange-500" />
            Student Information
          </CardTitle>
          <CardDescription>
            Your registered account and personal details
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Full Name
            </p>
            <p className="font-semibold text-foreground">
              {application.user?.name ?? "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email Address
            </p>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="break-all">
                {application.user?.email ?? "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Education Track
            </p>
            <div>
              <Badge variant="secondary" className="font-medium">
                {application.educationType}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Application ID
            </p>
            <p className="break-all font-mono text-xs text-muted-foreground sm:text-sm">
              {application.id}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= Program Information ================= */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-orange-500" />
            Program Information
          </CardTitle>
          <CardDescription>
            The academic program you applied for
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Program Name
            </p>
            <p className="font-semibold text-foreground">
              {application.program?.name ?? "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Degree Type
            </p>
            <div className="flex items-center gap-2 font-medium">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>{application.program?.degreeType ?? "N/A"}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Duration
            </p>
            <div className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {application.program?.duration
                  ? `${application.program.duration} Years`
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current Status
            </p>
            <div className="flex items-center gap-2 font-medium pt-0.5">
              <StatusIcon className="h-4 w-4 text-muted-foreground" />
              <span>{currentStatus.label}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Documents ================= */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Submitted Documents
          </h2>
          <p className="text-sm text-muted-foreground">
            Academic transcripts and certifications attached to your application
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {renderDocument("SSC Result", application.sscResult)}
          {renderDocument("HSC Result", application.hscResult)}
          {renderDocument("Diploma Result", application.diplomaResult)}
        </div>
      </div>

      {/* ================= Rejection Reason ================= */}
      {application.rejectionReason && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-700">Rejection Reason</h3>
                <p className="mt-1 text-sm leading-relaxed text-red-600">
                  {application.rejectionReason}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= Submission Meta ================= */}
      <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>
          Application submitted on{" "}
          {application.submittedAt
            ? new Date(application.submittedAt).toLocaleDateString("en-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default StudentApplicaton;
