
"use client";

import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  FileCheck2,
  RefreshCw,
  ArrowUpRight,
  AlertCircle,
  Users,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import { useGetInstrutorStats } from "../../../hooks/instrutorDashboad.hook";

export default function InstructorDashboardPage() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetInstrutorStats();

  const stats = response?.data;

  const statCards = [
    {
      title: "Assigned Courses",
      value: stats?.assignedCourseCount ?? 0,
      description: "Courses assigned to you",
      icon: BookOpen,
      iconStyle: "bg-orange-50 text-orange-600",
      accent: "bg-orange-500",
    },
    {
      title: "Total Students",
      value: stats?.totalStudentCount ?? 0,
      description: "Students in your courses",
      icon: GraduationCap,
      iconStyle: "bg-blue-50 text-blue-600",
      accent: "bg-blue-500",
    },
    {
      title: "Total Exams",
      value: stats?.totalExamCount ?? 0,
      description: "Exams created by you",
      icon: ClipboardList,
      iconStyle: "bg-violet-50 text-violet-600",
      accent: "bg-violet-500",
    },
    {
      title: "Marks Submitted",
      value: stats?.totalMarksSubmitted ?? 0,
      description: "Student marks records",
      icon: FileCheck2,
      iconStyle: "bg-emerald-50 text-emerald-600",
      accent: "bg-emerald-500",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              UniSphere Faculty Portal
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Instructor Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your courses, track your students, and monitor
              your academic activities from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </header>

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                <ChartNoAxesColumnIncreasing size={14} />
                Academic Overview
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Welcome to your workspace
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Your academic activities at a glance. Keep track of
                your assigned courses, students, exams, and marks.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl border border-white/10 bg-white/10 sm:self-center">
              <GraduationCap
                size={34}
                className="text-orange-400"
                strokeWidth={1.6}
              />
            </div>
          </div>
        </section>

        {/* Error State */}
        {isError && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
            <AlertCircle
              size={21}
              className="shrink-0 text-red-600"
            />

            <div className="flex-1">
              <p className="font-semibold text-red-800">
                Failed to load dashboard statistics
              </p>
              <p className="mt-1 text-sm text-red-700">
                Check your connection or try again.
              </p>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Key Statistics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A summary of your teaching activities
              </p>
            </div>

            <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
              Live overview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${stat.accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      {isLoading ? (
                        <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
                      ) : (
                        <h3 className="mt-3 break-words text-3xl font-bold tracking-tight text-slate-900">
                          {stat.value.toLocaleString()}
                        </h3>
                      )}
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle} transition group-hover:scale-105`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <ArrowUpRight size={14} />
                    </span>

                    <p className="text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Teaching Summary */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="font-bold text-slate-900">
              Teaching Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick overview of your current responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <BookOpen size={17} className="text-orange-500" />
                Course Assignments
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {isLoading
                  ? "—"
                  : (stats?.assignedCourseCount ?? 0).toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Courses assigned to your account
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Users size={17} className="text-blue-500" />
                Student Reach
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {isLoading
                  ? "—"
                  : (stats?.totalStudentCount ?? 0).toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Unique students in your assigned courses
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <FileCheck2 size={17} className="text-emerald-500" />
                Marks Records
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {isLoading
                  ? "—"
                  : (stats?.totalMarksSubmitted ?? 0).toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Marks records for assigned courses
              </p>
            </div>
          </div>
        </section>

        <footer className="pb-2 text-center text-xs text-slate-400">
          UniSphere · Instructor Workspace
        </footer>
      </div>
    </main>
  );
}
