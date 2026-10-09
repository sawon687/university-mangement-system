"use client";

import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  User,
  XCircle,
  BookOpen,
  Award,
  Clock,
  CreditCard,
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
import { usegetStatusBadge } from "../../../hooks/badgeStatus.hook";
import { usePaymentsCreate } from "../../../hooks/payment.hook";

type FileResult = {
  url: string;
  publicId?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
};

const StudentApplication = () => {
  const { data, isLoading } = useGetAdmission();
  const { mutate: paymentCreate } = usePaymentsCreate();
  const application = data?.data ?? null;

  const handlePayments = (applicationsId: string) => {
    paymentCreate(
      { applicationsId },
      {
        onSuccess: (res) => {
          window.location = res?.data?.paymentUrl;
        },
        onError: (error: any) => {
          window.alert(
            error?.data?.message ||
              error?.errors?.message ||
              "Payment could not be completed."
          );
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!application) {
    return (
      <Card className="mx-auto max-w-xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-full bg-orange-50 p-3">
            <FileText className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="text-base font-semibold">No Admission Application Found</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            You have not submitted an admission application yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const renderDocument = (title: string, document: FileResult | null | undefined) => {
    if (!document?.url) {
      return (
        <Card key={title} className="border-dashed shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-md bg-muted p-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">No document uploaded</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const isPdf =
      document.mimeType === "application/pdf" ||
      document.url.toLowerCase().includes(".pdf") ||
      document.url.includes("/raw/upload/");

    return (
      <Card key={title} className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow">
        <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 rounded-md bg-orange-100 p-2">
              <FileText className="h-4 w-4 text-orange-600" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-sm font-semibold">{title}</CardTitle>
              <CardDescription className="text-xs">{isPdf ? "PDF Document" : "Image Document"}</CardDescription>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="h-8 text-xs">
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              Open <ExternalLink className="ml-1.5 h-3 w-3" />
            </a>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          {isPdf ? (
            <div className="h-60 w-full bg-muted">
              <iframe src={document.url} title={title} className="h-full w-full border-0" />
            </div>
          ) : (
            <div className="flex h-60 items-center justify-center bg-muted/40 p-3">
              <img src={document.url} alt={title} className="max-h-full max-w-full rounded object-contain shadow-sm" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 pb-8">
      {/* Header */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Admission Application</h1>
              <p className="text-xs text-muted-foreground">Manage your status and uploaded records</p>
            </div>
          </div>
          {usegetStatusBadge(application.status)}
        </CardContent>
      </Card>

      {/* Grid details */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Student Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="p-4 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <User className="h-4 w-4 text-orange-500" /> Student Profile
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-4 p-4 text-sm">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Full Name</p>
              <p className="font-medium mt-0.5">{application.user?.name ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Email Address</p>
              <div className="flex items-center gap-1.5 font-medium mt-0.5">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{application.user?.email ?? "N/A"}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Education Track</p>
                <Badge variant="secondary" className="mt-1 font-normal text-xs">{application.educationType ?? "N/A"}</Badge>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Application ID</p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{application.id.slice(0, 8)}...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Program Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="p-4 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-orange-500" /> Program Applied
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-4 p-4 text-sm">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Program Name</p>
              <p className="font-medium mt-0.5">{application.program?.name ?? "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Degree Type</p>
                <div className="flex items-center gap-1.5 font-medium mt-0.5">
                  <Award className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{application.program?.degreeType ?? "N/A"}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Duration</p>
                <div className="flex items-center gap-1.5 font-medium mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{application.program?.duration ? `${application.program.duration} Yrs` : "N/A"}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Submission Date</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>
                  {application.submittedAt
                    ? new Date(application.submittedAt).toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" })
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submitted Documents */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold tracking-tight">Academic Transcripts</h2>
          <p className="text-xs text-muted-foreground">Attached documents for verification</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {renderDocument("SSC Result", application.sscResult)}
          {renderDocument("HSC Result", application.hscResult)}
          {renderDocument("Diploma Result", application.diplomaResult)}
        </div>
      </section>

      {/* Rejection Alert */}
      {application.status === "REJECTED" && application.rejectionReason && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardContent className="flex gap-3 p-4">
            <XCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-700">Application Rejected</h3>
              <p className="mt-1 text-xs text-red-600 leading-relaxed">{application.rejectionReason}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accepted Payment CTA */}
      {application.status === "ACCEPTED" && (
        <Card className="overflow-hidden border-emerald-200 shadow-sm">
          <div className="h-1 bg-emerald-500" />
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-emerald-800">Application Accepted</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Proceed with the admission fee payment to secure your seat.</p>
              </div>
            </div>
            <Button size="sm" onClick={() => handlePayments(application?.id)} className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="mr-1.5 h-3.5 w-3.5" /> Pay Fee
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Paid Status Banner */}
      {application.status === "PAID" && (
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-emerald-800">Payment Complete</h3>
              <p className="text-xs text-emerald-700 mt-0.5">Your payment has been successfully recorded.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentApplication;