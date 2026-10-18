"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, GraduationCap } from "lucide-react";

import {
  useSemesterResult,
  useStudentSemester,
} from "../../../hooks/semester.hook";

import { ISemester } from "../../../type/semester.type";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

interface IResultSubject {
  courseId: string;
  courseName: string;
  courseCode: string;
  credit: number;
  grade: string | null;
  gradePoint: number | null;
}

interface ISemesterWithCurrent extends ISemester {
  isCurrent?: boolean;
}

const StudentSemesterResult = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  const semesterQuery = useStudentSemester();

  const semesters: ISemesterWithCurrent[] =
    semesterQuery?.data?.data ?? [];

 
  useEffect(() => {
    if (semesters.length === 0 || selectedSemester) return;
    const date=new Date()
    const currentYear=date.getFullYear()
    const runningSemester = semesters.find(
      (semester) => semester.year===currentYear
    );

    const latestSemester = [...semesters].sort((a, b) => {
      const yearDifference = Number(b.year) - Number(a.year);

      if (yearDifference !== 0) return yearDifference;

      return String(b.id).localeCompare(String(a.id));
    })[0];

    const defaultSemester = runningSemester ?? latestSemester;

    if (defaultSemester) {
      setSelectedSemester(String(defaultSemester.id));
    }
  }, [semesters, selectedSemester]);

 
  const { data, isLoading, isError } =
    useSemesterResult(selectedSemester);

  const resultData = data?.data;

  const currentSubjects: IResultSubject[] =
    resultData?.subjects ?? [];

  const gpa = Number(resultData?.gpa ?? 0);

  const currentSemester = semesters.find(
    (semester) => String(semester.id) === selectedSemester,
  );

  const isSemesterLoading = semesterQuery.isLoading;
  const hasSemesters = semesters.length > 0;

  return (
    <Card className="rounded-3xl border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
              <BookOpen className="h-5 w-5 text-primary" />
              Academic Results
            </CardTitle>

            <CardDescription className="mt-1 text-xs text-slate-500">
              Your running semester results are selected automatically.
              You can also choose another semester.
            </CardDescription>
          </div>

          <div className="w-full sm:w-56">
            <Select
              value={selectedSemester}
              onValueChange={(value) => setSelectedSemester(value ?? "")}
            >
              <SelectTrigger className="h-12 border-slate-200 bg-white text-slate-900">
                <SelectValue placeholder="Choose semester">
                  {currentSemester
                    ? `${currentSemester.name} ${currentSemester.year}`
                    : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem
                    key={semester.id}
                    value={String(semester.id)}
                  >
                    {semester.name} {semester.year}
                     {semester.isCurrent ? " (Running)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Semester selector */}
        {isSemesterLoading ? (
          <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
        ) : hasSemesters ? (
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {semesters.map((semester) => {
              const semesterId = String(semester.id);
              const isActive = selectedSemester === semesterId;

              return (
                <Button
                  key={semesterId}
                  type="button"
                  variant={isActive ? "default" : "secondary"}
                  onClick={() => setSelectedSemester(semesterId)}
                  className={`shrink-0 rounded-xl px-4 text-xs sm:text-sm ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-indigo-200 hover:bg-indigo-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {semester.name}
                  {semester.isCurrent ? " • Running" : ""}
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-slate-500">
            No semesters are available for your account.
          </div>
        )}

        {/* Course results */}
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <Table className="min-w-[650px]">
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="px-5 font-semibold text-slate-500">
                    Course Code
                  </TableHead>

                  <TableHead className="px-5 font-semibold text-slate-500">
                    Course Title
                  </TableHead>

                  <TableHead className="px-5 text-center font-semibold text-slate-500">
                    Credit
                  </TableHead>

                  <TableHead className="px-5 text-center font-semibold text-slate-500">
                    Grade
                  </TableHead>

                  <TableHead className="px-5 text-center font-semibold text-slate-500">
                    Grade Point
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isSemesterLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-slate-500"
                    >
                      Loading semesters...
                    </TableCell>
                  </TableRow>
                ) : !hasSemesters ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-slate-500"
                    >
                      No semesters found.
                    </TableCell>
                  </TableRow>
                ) : !selectedSemester ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-slate-500"
                    >
                      Selecting your running semester...
                    </TableCell>
                  </TableRow>
                ) : isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-slate-500"
                    >
                      Loading semester results...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-red-500"
                    >
                      Failed to load results. Please try again.
                    </TableCell>
                  </TableRow>
                ) : currentSubjects.length > 0 ? (
                  currentSubjects.map((subject) => (
                    <TableRow
                      key={subject.courseId}
                      className="transition-colors hover:bg-indigo-50/30"
                    >
                      <TableCell className="px-5 font-mono font-bold text-indigo-600">
                        {subject.courseCode}
                      </TableCell>

                      <TableCell className="px-5 font-medium text-slate-800">
                        {subject.courseName}
                      </TableCell>

                      <TableCell className="px-5 text-center font-medium text-slate-600">
                        {Number(subject.credit).toFixed(1)}
                      </TableCell>

                      <TableCell className="px-5 text-center">
                        {subject.grade != null ? (
                          <Badge
                            variant="secondary"
                            className="rounded-md bg-slate-100 px-2.5 py-1 font-bold text-slate-800"
                          >
                            {subject.grade}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="rounded-md border-amber-200 bg-amber-50 text-amber-700"
                          >
                            Pending
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="px-5 text-center font-semibold text-slate-700">
                        {subject.gradePoint != null &&
                        Number.isFinite(Number(subject.gradePoint))
                          ? Number(subject.gradePoint).toFixed(2)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-slate-500"
                    >
                      No results found for this semester.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Semester summary */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
            <GraduationCap className="h-4 w-4 text-primary" />

            <span>
              Selected:{" "}
              <strong className="text-slate-800">
                {currentSemester
                  ? `${currentSemester.name} ${currentSemester.year}`
                  : "None"}
              </strong>
            </span>

            {currentSemester?.isCurrent && (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                Running Semester
              </Badge>
            )}

            <span>({currentSubjects.length} Courses)</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-white px-5 py-2.5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Semester GPA:
            </span>

            <span className="text-xl font-extrabold text-primary">
              {selectedSemester && resultData && !isLoading && !isError
                ? Number.isFinite(gpa)
                  ? gpa.toFixed(2)
                  : "—"
                : "—"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSemesterResult;