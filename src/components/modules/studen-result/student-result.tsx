"use client";

import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Search,
  TrendingUp,
  FileText,
  Loader2,
  Info,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ISemester {
  id: string;
  name: string;
  year?: number;
}

interface IGPAResult {
  id: string;
  studentId: string;
  semesterId: string;
  totalCredits: number;
  totalPoints: number;
  gpa: number;
  createdAt: string;
  updatedAt: string;
}

interface StudentGPAResultTableProps {
  semesters: ISemester[];
  gpaResults: IGPAResult[];
  isLoading?: boolean;
}

function formatNumber(value: number) {
  return Number(value ?? 0).toFixed(2);
}

function getGrade(gpa: number) {
  if (gpa >= 4) return "A+";
  if (gpa >= 3.75) return "A";
  if (gpa >= 3.5) return "A-";
  if (gpa >= 3.25) return "B+";
  if (gpa >= 3) return "B";
  if (gpa >= 2.75) return "B-";
  if (gpa >= 2.5) return "C+";
  if (gpa >= 2.25) return "C";
  if (gpa >= 2) return "D";
  return "F";
}

function getGradeColor(gpa: number) {
  if (gpa >= 3.5) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300";
  }

  if (gpa >= 3) {
    return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300";
  }

  if (gpa >= 2) {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300";
}

export default function StudentGPAResultTable({
  semesters,
  gpaResults,
  isLoading = false,
}: StudentGPAResultTableProps) {
  const [semesterFilter, setSemesterFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredResults = useMemo(() => {
    return gpaResults.filter((result) => {
      const matchesSemester =
        semesterFilter === "ALL" || result.semesterId === semesterFilter;

      const semester = semesters.find((item) => item.id === result.semesterId);

      const semesterName = semester
        ? `${semester.name} ${semester.year ?? ""}`
        : "";

      const matchesSearch = semesterName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesSemester && matchesSearch;
    });
  }, [gpaResults, semesters, semesterFilter, search]);

  const totalCredits = filteredResults.reduce(
    (sum, result) => sum + Number(result.totalCredits),
    0,
  );

  const totalPoints = filteredResults.reduce(
    (sum, result) => sum + Number(result.totalPoints),
    0,
  );

  // Weighted GPA across the displayed semesters
  const cumulativeGPA =
    totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950">
              <GraduationCap className="h-6 w-6" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              GPA Results
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              View and track your semester-wise academic performance.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit rounded-xl border-orange-200 bg-orange-50 px-3 py-2 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300"
          >
            <Award className="mr-2 h-4 w-4" />
            Academic Results
          </Badge>
        </div>

        {/* Summary Cards */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {semesterFilter === "ALL" ? "Cumulative GPA" : "Semester GPA"}
                </p>

                <div className="rounded-xl bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-950">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {formatNumber(cumulativeGPA)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  / 4.00
                </span>
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {semesterFilter === "ALL"
                  ? "Weighted GPA for displayed results"
                  : "Selected semester performance"}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Credits
                </p>

                <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {formatNumber(totalCredits)}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Credits included in the selected results
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Points
                </p>

                <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-950">
                  <Award className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {formatNumber(totalPoints)}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Credit-weighted grade points
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Result Table */}

        <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm dark:border-slate-800">
          <CardHeader className="gap-4 border-b sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-orange-500" />
                Semester Result History
              </CardTitle>

              <CardDescription className="mt-2">
                GPA, total credits and grade points for each semester.
              </CardDescription>
            </div>

            <Badge variant="secondary" className="w-fit">
              {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "result" : "results"}
            </Badge>
          </CardHeader>

          {/* Filters */}

          <div className="grid gap-3 border-b bg-white p-4 dark:bg-slate-900 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search semester..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-11 rounded-xl pl-9"
              />
            </div>

            <Select
              value={semesterFilter}
              onValueChange={(value) => setSemesterFilter(value ?? "ALL")}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Semesters</SelectItem>

                {semesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name}
                    {semester.year ? ` - ${semester.year}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />

                <p className="text-sm text-muted-foreground">
                  Loading GPA results...
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
                <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-orange-500 dark:bg-orange-950">
                  <FileText className="h-8 w-8" />
                </div>

                <h3 className="font-semibold">No GPA results found</h3>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  No GPA results match your selected semester or search. Results
                  will appear here after they are generated.
                </p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-900">
                      <TableHead className="whitespace-nowrap pl-5">
                        #
                      </TableHead>

                      <TableHead className="min-w-44 whitespace-nowrap">
                        Semester
                      </TableHead>

                      <TableHead className="whitespace-nowrap text-right">
                        Total Credits
                      </TableHead>

                      <TableHead className="whitespace-nowrap text-right">
                        Total Points
                      </TableHead>

                      <TableHead className="whitespace-nowrap text-center">
                        GPA
                      </TableHead>

                      <TableHead className="whitespace-nowrap text-center">
                        Grade
                      </TableHead>

                      <TableHead className="whitespace-nowrap pr-5">
                        Last Updated
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredResults.map((result, index) => {
                      const semester = semesters.find(
                        (item) => item.id === result.semesterId,
                      );

                      const gpa = Number(result.gpa);

                      return (
                        <TableRow key={result.id}>
                          <TableCell className="pl-5 font-medium text-muted-foreground">
                            {index + 1}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950">
                                <CalendarDays className="h-5 w-5" />
                              </div>

                              <div>
                                <p className="font-semibold">
                                  {semester?.name ?? "Unknown Semester"}
                                </p>

                                {semester?.year && (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {semester.year}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-right font-medium tabular-nums">
                            {formatNumber(result.totalCredits)}
                          </TableCell>

                          <TableCell className="text-right font-medium tabular-nums">
                            {formatNumber(result.totalPoints)}
                          </TableCell>

                          <TableCell className="text-center">
                            <span className="font-bold tabular-nums">
                              {formatNumber(gpa)}
                            </span>

                            <span className="ml-1 text-xs text-muted-foreground">
                              / 4.00
                            </span>
                          </TableCell>

                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={getGradeColor(gpa)}
                            >
                              {getGrade(gpa)}
                            </Badge>
                          </TableCell>

                          <TableCell className="whitespace-nowrap pr-5 text-sm text-muted-foreground">
                            {new Date(result.updatedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {!isLoading && filteredResults.length > 0 && (
              <div className="flex flex-col gap-2 border-t bg-slate-50/70 px-5 py-4 text-xs text-muted-foreground dark:bg-slate-900/50 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Showing {filteredResults.length} semester{" "}
                  {filteredResults.length === 1 ? "result" : "results"}
                </span>

                <span>GPA = Total Points ÷ Total Credits</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formula Information */}

        <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 dark:border-orange-950 dark:bg-orange-950/20">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

          <div>
            <p className="text-sm font-semibold text-orange-900 dark:text-orange-300">
              How GPA is calculated
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Semester GPA is calculated by dividing the total of (course grade
              point × course credit) by the total credits. The cumulative GPA
              shown for all semesters uses the same credit-weighted calculation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
