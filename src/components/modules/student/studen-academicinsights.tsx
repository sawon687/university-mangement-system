"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAcademicInsights } from "@/hooks/ai.hook";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubjectInsight {
  name: string;
  courseCode: string;
  gradePoint: number;
  credit: number;
}

interface SemesterInsight {
  semester: string;
  year: number;
  gpa: number;
  subjects: SubjectInsight[];
}

interface AcademicInsightsData {
  currentCGPA: number | null;
  semesters: SemesterInsight[];
  insights: string;
}

interface TrendResult {
  label: string;
  description: string;
  positive: boolean | null;
}

function formatGPA(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toFixed(2)
    : "N/A";
}

function getTrend(semesters: SemesterInsight[]): TrendResult {
  if (semesters.length < 2) {
    return {
      label: "Not enough data",
      description: "At least two semesters are needed to compare GPA.",
      positive: null,
    };
  }

  const firstGPA = semesters[0].gpa;
  const latestGPA = semesters[semesters.length - 1].gpa;
  const difference = latestGPA - firstGPA;

  if (difference > 0.05) {
    return {
      label: "Improving",
      description: `GPA increased by ${difference.toFixed(
        2,
      )} points since your first recorded semester.`,
      positive: true,
    };
  }

  if (difference < -0.05) {
    return {
      label: "Declining",
      description: `GPA decreased by ${Math.abs(
        difference,
      ).toFixed(2)} points since your first recorded semester.`,
      positive: false,
    };
  }

  return {
    label: "Stable",
    description: "Your first and latest semester GPAs are similar.",
    positive: null,
  };
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>

      <div className="h-72 animate-pulse rounded-xl border bg-muted/40" />
      <div className="h-48 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({
  title = "No semester results available",
  description = "Your academic insights will appear when results are available.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-4 text-center">
      <BookOpen className="mb-3 size-9 text-muted-foreground" />

      <p className="font-medium">{title}</p>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function AcademicInsights() {
  const {
    data: response,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useAcademicInsights();

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !response?.data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="rounded-full bg-destructive/10 p-4 text-destructive">
            <BrainCircuit className="size-8" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Unable to load Academic Insights
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Please check your connection and try again."}
            </p>
          </div>

          <Button
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 size-4 ${
                isFetching ? "animate-spin" : ""
              }`}
            />

            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const academicData = response.data as AcademicInsightsData;

  const semesters = academicData.semesters ?? [];

  /*
   * Backend থেকে semesters chronological order-এ আসবে।
   * তাই শেষ semester-টাই latest semester.
   */
  const latestSemester = semesters.at(-1);

  const trend = getTrend(semesters);

  const chartData = semesters.map((semester) => ({
    semester: semester.semester,
    GPA: semester.gpa,
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* ==================== HEADER ==================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-orange-500/10 p-2 text-orange-600">
              <BrainCircuit className="size-6" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Academic Insights
            </h1>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Understand your academic progress and discover ways to improve
            your performance with AI-powered analysis.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="shrink-0"
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isFetching ? "animate-spin" : ""
            }`}
          />

          Refresh insights
        </Button>
      </div>

      {/* ==================== SUMMARY CARDS ==================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Current CGPA */}

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Current CGPA
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatGPA(academicData.currentCGPA)}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Cumulative result from completed subjects
              </p>
            </div>

            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-600">
              <GraduationCap className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* Latest Semester GPA */}

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Latest Semester GPA
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatGPA(latestSemester?.gpa)}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {latestSemester?.semester ?? "No semester results"}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
              <BookOpen className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* GPA Trend */}

        <Card className="sm:col-span-2 xl:col-span-1">
          <CardContent className="flex items-center justify-between p-5">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                GPA Trend
              </p>

              <p className="mt-2 text-2xl font-bold">
                {trend.label}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {trend.description}
              </p>
            </div>

            <div
              className={`shrink-0 rounded-xl p-3 ${
                trend.positive === true
                  ? "bg-emerald-500/10 text-emerald-600"
                  : trend.positive === false
                    ? "bg-red-500/10 text-red-600"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {trend.positive === true ? (
                <ArrowUpRight className="size-6" />
              ) : trend.positive === false ? (
                <ArrowDownRight className="size-6" />
              ) : (
                <Activity className="size-6" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==================== GPA CHART ==================== */}

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-600">
              <TrendingUp className="size-5" />
            </div>

            <div>
              <CardTitle>Semester GPA Trend</CardTitle>

              <CardDescription className="mt-1">
                Your semester-wise academic performance over time.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {semesters.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={chartData}
                  margin={{
                    top: 12,
                    right: 12,
                    left: -16,
                    bottom: 8,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />

                  <XAxis
                    dataKey="semester"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    domain={[0, 4]}
                    ticks={[0, 1, 2, 3, 4]}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatGPA(Number(value)),
                      "GPA",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="GPA"
                    stroke="#ea580c"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#ea580c",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ==================== AI ANALYSIS ==================== */}

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-orange-500/[0.04]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-600">
              <Sparkles className="size-5" />
            </div>

            <div>
              <CardTitle>AI Academic Analysis</CardTitle>

              <CardDescription className="mt-1">
                Personalized observations based on your academic records.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {semesters.length === 0 ? (
            <p className="text-sm leading-7 text-muted-foreground">
              There is not enough academic data to generate meaningful
              insights yet. Your analysis will become available after
              semester results are recorded.
            </p>
          ) : (
            <div className="whitespace-pre-wrap break-words text-sm leading-7">
              {academicData.insights}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ==================== SEMESTER OVERVIEW ==================== */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600">
              <Target className="size-5" />
            </div>

            <div>
              <CardTitle>Semester Overview</CardTitle>

              <CardDescription className="mt-1">
                Review your GPA and completed subjects for each semester.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {semesters.length === 0 ? (
            <EmptyState
              title="No semester data available"
              description="Your semester overview will appear when academic results are recorded."
            />
          ) : (
            <div className="space-y-3">
              {semesters.map((semester) => (
                <div
                  key={`${semester.year}-${semester.semester}`}
                  className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
                >
                  {/* Semester header */}

                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-semibold">
                        {semester.semester}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {semester.subjects.length} completed subject(s)
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-muted-foreground">
                        GPA
                      </p>

                      <p className="text-xl font-bold">
                        {formatGPA(semester.gpa)}
                      </p>
                    </div>
                  </div>

                  {/* Subjects */}

                  {semester.subjects.length > 0 && (
                    <div className="mt-4 space-y-2 border-t pt-3">
                      {semester.subjects.map((subject) => (
                        <div
                          key={`${semester.year}-${semester.semester}-${subject.courseCode}`}
                          className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm hover:bg-muted/40"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {subject.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {subject.courseCode} ·{" "}
                              {subject.credit} credits
                            </p>
                          </div>

                          <span className="shrink-0 rounded-md bg-muted px-2.5 py-1 font-semibold">
                            {formatGPA(subject.gradePoint)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}