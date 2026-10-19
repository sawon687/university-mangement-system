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
Activity,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
} from "recharts";

import { useGetInstrutorStats } from "../../../hooks/instrutorDashboad.hook";

const statConfig = [
{
title: "Assigned Courses",
description: "Courses assigned to you",
icon: BookOpen,
color: "text-orange-600 dark",
iconBg: "bg-orange-500/10",
chartColor: "#f97316",
key: "assignedCourseCount",
},
{
title: "Total Students",
description: "Students in your courses",
icon: GraduationCap,
color: "text-blue-600 dark",
iconBg: "bg-blue-500/10",
chartColor: "#3b82f6",
key: "totalStudentCount",
},
{
title: "Total Exams",
description: "Exams created by you",
icon: ClipboardList,
color: "text-violet-600 dark",
iconBg: "bg-violet-500/10",
chartColor: "#8b5cf6",
key: "totalExamCount",
},
{
title: "Marks Submitted",
description: "Student marks records",
icon: FileCheck2,
color: "text-emerald-600 dark",
iconBg: "bg-emerald-500/10",
chartColor: "#10b981",
key: "totalMarksSubmitted",
},
] as const;

const reveal = {
hidden: { opacity: 0, y: 20 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.45, ease: "easeOut" as const },
},
};

export default function InstructorDashboard() {
const {
data: response,
isLoading,
isError,
refetch,
isFetching,
} = useGetInstrutorStats();

const shouldReduceMotion = useReducedMotion();
const stats = response?.data;

const statCards = statConfig.map((item) => ({
...item,
value: stats?.[item.key] ?? 0,
}));

const chartData = statCards.map((item) => ({
name: item.title,
value: Number(item.value),
fill: item.chartColor,
}));

return (
<main className="min-h-screen bg-background px-4 py-6 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
<div className="mx-auto max-w-7xl space-y-8">
{/* Header */}
<motion.header
initial="hidden"
animate="visible"
variants={reveal}
className="flex flex-col justify-between gap-4 sm sm"
>
<div>
<div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400">
<span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
UniSphere Faculty Portal
</div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Instructor Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Manage your courses, track your students, and monitor
          your academic activities from one place.
        </p>
      </div>

      <button
        type="button"
        onClick={() => refetch()}
        disabled={isFetching}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition hover:border-orange-500/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
      >
        <RefreshCw
          size={16}
          className={isFetching ? "animate-spin" : ""}
        />
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>
    </motion.header>

    {/* Welcome Banner */}
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-lg sm:p-8"
    >
      <div className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 -z-10 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
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

        <motion.div
          whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.05 }}
          className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl border border-white/10 bg-white/10 sm:self-center"
        >
          <GraduationCap
            size={34}
            className="text-orange-400"
            strokeWidth={1.6}
          />
        </motion.div>
      </div>
    </motion.section>

    {/* Error State */}
    {isError && (
      <div
        role="alert"
        className="flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center"
      >
        <AlertCircle size={21} className="shrink-0 text-destructive" />

        <div className="flex-1">
          <p className="font-semibold text-foreground">
            Failed to load dashboard statistics
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check your connection or try again.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    )}

    {/* Statistics Cards */}
    <section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Key Statistics</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A summary of your teaching activities
          </p>
        </div>

        <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
          <Activity size={13} className="text-emerald-500" />
          Dashboard overview
        </span>
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.article
              key={stat.title}
              variants={reveal}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -5, transition: { duration: 0.2 } }
              }
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: stat.chartColor }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  {isLoading ? (
                    <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-muted" />
                  ) : (
                    <h3 className="mt-3 break-words text-3xl font-bold tracking-tight">
                      {Number(stat.value).toLocaleString()}
                    </h3>
                  )}
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={23} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ArrowUpRight size={14} />
                </span>

                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>

    {/* Bar Chart */}
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <ChartNoAxesColumnIncreasing size={21} />
          </div>
          <div>
            <h2 className="font-bold">Academic Activity Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare your current dashboard metrics
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-end gap-6 rounded-xl bg-muted/40 p-6">
          {[45, 75, 55, 90].map((height, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse rounded-t-lg bg-muted"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      ) : isError ? (
        <div className="flex h-[250px] items-center justify-center rounded-xl bg-muted/30 text-sm text-muted-foreground">
          Chart unavailable. Please refresh the dashboard.
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 8, left: -18, bottom: 8 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-12}
                textAnchor="end"
                height={55}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.45 }}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--popover-foreground)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                labelStyle={{
                  color: "var(--popover-foreground)",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString(),
                  "Count",
                ]}
              />

              <Bar
                dataKey="value"
                name="Count"
                radius={[7, 7, 0, 0]}
                maxBarSize={64}
                isAnimationActive={!shouldReduceMotion}
                animationDuration={800}
              >
                {/*
                  Each metric keeps its own color.
                  Recharts uses the fill field from chartData.
                */}
                {statCards.map((stat) => (
                  <rect key={stat.title} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Note: Courses, students, exams, and submitted marks are different
        types of metrics. The chart compares their counts; it does not
        represent percentages or a shared performance score.
      </p>
    </motion.section>

    {/* Teaching Summary */}
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <h2 className="font-bold">Teaching Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick overview of your current responsibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          {
            title: "Course Assignments",
            value: stats?.assignedCourseCount ?? 0,
            description: "Courses assigned to your account",
            icon: BookOpen,
            color: "text-orange-600 dark:text-orange-400",
          },
          {
            title: "Student Reach",
            value: stats?.totalStudentCount ?? 0,
            description: "Students in your assigned courses",
            icon: Users,
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            title: "Marks Records",
            value: stats?.totalMarksSubmitted ?? 0,
            description: "Marks records for assigned courses",
            icon: FileCheck2,
            color: "text-emerald-600 dark:text-emerald-400",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={17} className={item.color} />
                {item.title}
              </div>

              <p className="text-2xl font-bold">
                {isLoading
                  ? "—"
                  : Number(item.value).toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.section>

    <footer className="pb-2 text-center text-xs text-muted-foreground">
      UniSphere · Instructor Workspace
    </footer>
  </div>
</main>

);
}