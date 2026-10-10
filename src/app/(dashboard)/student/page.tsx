
"use client";

import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Award,
  Wallet,
  FileCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
  UserRound,
  Mail,
  Phone,
  MapPin,
  VenusAndMars,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetStudentDasbordStats } from "../../../hooks/studentDashboard.hook";

type StudentDashboardData = {
  student: {
    id: string;
    name: string;
    email: string;
    role: string;
    studentProfile?: {
      profilePhoto?: string | null;
    } | null;
  };
  studentProfile?: {
    phone?: string | null;
    address?: string | null;
    gender?: string | null;
    dateOfBirth?: string | null;
    profilePhoto?: string | null;
  } | null;
  admissionApplication?: {
    status?: string | null;
    program?: {
      name?: string | null;
      department?: {
        name?: string | null;
      } | null;
    } | null;
  } | null;
  statistics: {
    enrolledSemesters: number;
    totalCourses: number;
    totalCredits: number;
    totalResults: number;
    totalFees: number;
    totalPaid: number;
    totalDue: number;
  };
  enrollments?: Array<{
    id: string;
    semester?: {
      name?: string | null;
    } | null;
    Enrolementcourses?: Array<{
      id: string;
      course: {
        id: string;
        title: string;
        code: string;
        credit: number | string;
      };
    }>;
  }> | null;
  gpaResults?: Array<{
    id: string;
    gpa: number | string;
    totalCredits: number | string;
    createdAt?: string;
    updatedAt?: string;
    semester?: {
      name?: string | null;
    } | null;
  }> | null;
};

const money = (value: number | string | null | undefined) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));

const formatStatus = (status?: string | null) =>
  (status || "NOT_APPLIED").replace(/_/g, " ");

export default function StudentDashboard() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetStudentDasbordStats();

  const dashboard = response?.data as
    | StudentDashboardData
    | undefined;

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (isError || !dashboard) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="size-7" />
        </div>

        <h2 className="text-lg font-semibold">
          Unable to load dashboard
        </h2>

        <p className="max-w-md text-sm text-muted-foreground">
          We couldn&apos;t retrieve your academic information.
          Please check your connection and try again.
        </p>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 size-4" />
          )}
          Try again
        </Button>
      </div>
    );
  }

  const {
    student,
    studentProfile,
    admissionApplication,
    statistics,
  } = dashboard;

  const enrollments = dashboard.enrollments ?? [];
  const gpaResults = dashboard.gpaResults ?? [];

  const latestGpa = [...gpaResults].sort((a, b) => {
    const dateA = new Date(
      a.updatedAt ?? a.createdAt ?? 0,
    ).getTime();

    const dateB = new Date(
      b.updatedAt ?? b.createdAt ?? 0,
    ).getTime();

    return dateB - dateA;
  })[0];

  const applicationStatus =
    admissionApplication?.status ?? "NOT_APPLIED";

  const statusVariant =
    applicationStatus === "APPROVED"
      ? "default"
      : applicationStatus === "REJECTED"
        ? "destructive"
        : "secondary";

  const profilePhoto =
    studentProfile?.profilePhoto ??
    student.studentProfile?.profilePhoto;

  return (
    <main className="min-h-screen space-y-6 bg-muted/20 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-primary/10 text-primary sm:size-16">
              {profilePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profilePhoto}
                  alt={student.name}
                  className="size-full object-cover"
                />
              ) : (
                <GraduationCap className="size-8" />
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <GraduationCap className="size-4 text-primary" />
                <span>UniSphere / Student Portal</span>
              </div>

              <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {student.name}!
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Track your academic progress, courses, and payments.
              </p>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="w-fit gap-2 px-3 py-2"
          >
            <UserRound className="size-4" />
            Student
          </Badge>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Enrolled Courses"
          value={statistics.totalCourses}
          description="Across all semesters"
          icon={<BookOpen className="size-5" />}
        />

        <SummaryCard
          title="Semesters"
          value={statistics.enrolledSemesters}
          description="Your enrollments"
          icon={<CalendarDays className="size-5" />}
        />

        <SummaryCard
          title="Latest GPA"
          value={
            latestGpa
              ? Number(latestGpa.gpa).toFixed(2)
              : "—"
          }
          description={
            latestGpa?.semester?.name ?? "No GPA available yet"
          }
          icon={<Award className="size-5" />}
        />

        <SummaryCard
          title="Outstanding Fees"
          value={money(statistics.totalDue)}
          description={`Paid: ${money(statistics.totalPaid)}`}
          icon={<Wallet className="size-5" />}
        />
      </section>

      {/* Student Information and Admission */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="size-5 text-primary" />
              Student Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              label="Full Name"
              value={student.name}
              icon={<UserRound className="size-4" />}
            />

            <InfoItem
              label="Email Address"
              value={student.email}
              icon={<Mail className="size-4" />}
            />

            <InfoItem
              label="Phone Number"
              value={studentProfile?.phone}
              icon={<Phone className="size-4" />}
            />

            <InfoItem
              label="Address"
              value={studentProfile?.address}
              icon={<MapPin className="size-4" />}
            />

            <InfoItem
              label="Gender"
              value={studentProfile?.gender}
              icon={<VenusAndMars className="size-4" />}
            />

            <InfoItem
              label="Date of Birth"
              value={studentProfile?.dateOfBirth}
              icon={<CalendarDays className="size-4" />}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileCheck className="size-5 text-primary" />
              Admission
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Application Status
              </p>

              <Badge variant={statusVariant} className="mt-2">
                {formatStatus(applicationStatus)}
              </Badge>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Applied Program
              </p>

              <p className="mt-1 break-words font-semibold">
                {admissionApplication?.program?.name ??
                  "Not applied"}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Department
              </p>

              <p className="mt-1 break-words font-medium">
                {admissionApplication?.program?.department?.name ??
                  "Not available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Enrolled Courses */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="size-5 text-primary" />
            My Enrolled Courses
          </CardTitle>
        </CardHeader>

        <CardContent>
          {enrollments.length === 0 ? (
            <EmptyState message="You have not enrolled in any courses yet." />
          ) : (
            <div className="space-y-6">
              {enrollments.map((enrollment) => {
                const courses =
                  enrollment.Enrolementcourses ?? [];

                return (
                  <div
                    key={enrollment.id}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-semibold">
                        {enrollment.semester?.name ?? "Semester"}
                      </h3>

                      <Badge variant="outline">
                        {courses.length}{" "}
                        {courses.length === 1 ? "course" : "courses"}
                      </Badge>
                    </div>

                    {courses.length === 0 ? (
                      <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
                        No courses assigned to this enrollment.
                      </p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {courses.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border bg-background p-4 transition-colors hover:bg-muted/30"
                          >
                            <div className="flex items-start gap-3">
                              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <BookOpen className="size-5" />
                              </div>

                              <div className="min-w-0">
                                <p className="break-words font-semibold">
                                  {item.course.title}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                  {item.course.code}
                                </p>

                                <Badge
                                  variant="secondary"
                                  className="mt-3"
                                >
                                  {Number(item.course.credit)} credits
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* GPA History */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="size-5 text-primary" />
            Semester GPA History
          </CardTitle>
        </CardHeader>

        <CardContent>
          {gpaResults.length === 0 ? (
            <EmptyState message="GPA will appear here after your results are published." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[...gpaResults]
                .sort((a, b) => {
                  const dateA = new Date(
                    a.updatedAt ?? a.createdAt ?? 0,
                  ).getTime();

                  const dateB = new Date(
                    b.updatedAt ?? b.createdAt ?? 0,
                  ).getTime();

                  return dateB - dateA;
                })
                .map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between gap-4 rounded-xl border bg-background p-4"
                  >
                    <div className="min-w-0">
                      <p className="break-words font-semibold">
                        {result.semester?.name ?? "Semester"}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {Number(result.totalCredits)} credits
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-bold text-primary">
                        {Number(result.gpa).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        GPA
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="size-5 text-primary" />
            Payment Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-3">
          <PaymentItem
            label="Total Fees"
            value={money(statistics.totalFees)}
          />

          <PaymentItem
            label="Total Paid"
            value={money(statistics.totalPaid)}
          />

          <PaymentItem
            label="Outstanding Balance"
            value={money(statistics.totalDue)}
          />
        </CardContent>
      </Card>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 break-words text-2xl font-bold tracking-tight">
            {value}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed px-5 py-10 text-center">
      <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
        <BookOpen className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function PaymentItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-xl font-bold">{value}</p>
    </div>
  );
}

