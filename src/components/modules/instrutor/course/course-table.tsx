
"use client";

import React from "react";
import {
  BookOpen,
  Users,
  Eye,
  ArrowUpRight,
  GraduationCap,
  Loader2,
} from "lucide-react";

import { useGetInstrutorCourse } from "../../../../hooks/courses.hook";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CreateExamModal from '../../../modal/Exam-modal';



const CourseTable = () => {
  const { data, isLoading, isError } = useGetInstrutorCourse();

  const courses = data?.data ?? [];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Courses
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your assigned courses, exams, and students.
            </p>
          </div>
        </div>

        <Badge variant="secondary" className="w-fit rounded-lg px-3 py-2">
          <BookOpen className="mr-2 size-4" />
          {courses.length} Assigned Courses
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Assigned Courses
              </p>
              <p className="mt-2 text-3xl font-bold">
                {courses.length}
              </p>
            </div>

            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Teaching Dashboard
              </p>
              <p className="mt-2 text-lg font-semibold">
                Course Management
              </p>
            </div>

            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Users className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Table */}
      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="gap-2 border-b bg-muted/20">
          <CardTitle className="text-lg">Assigned Courses</CardTitle>
          <CardDescription>
            Create exams and manage your assigned courses.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex min-h-60 items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                Loading courses...
              </span>
            </div>
          ) : isError ? (
            <div className="flex min-h-48 items-center justify-center p-6 text-sm text-destructive">
              Failed to load courses. Please try again.
            </div>
          ) : courses.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <BookOpen className="size-7 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No courses assigned</h3>

              <p className="text-sm text-muted-foreground">
                Your assigned courses will appear here.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="min-w-56 pl-6">
                      Course Information
                    </TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="min-w-64 pr-6 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {courses.map((item: any) => {
                    const course = item.course;

                    const students =
                      course?.courseEnrollment?.flatMap(
                        (entry: any) =>
                          entry.enrollment?.student
                            ? [entry.enrollment.student]
                            : [],
                      ) ?? [];

                    return (
                      <TableRow key={item.id} className="group">
                        {/* Course Information */}
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <BookOpen className="size-5" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold">
                                {course?.title ?? "Untitled Course"}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Assigned course
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Course Code */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {course?.code ?? "N/A"}
                          </Badge>
                        </TableCell>

                        {/* Students */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="size-4 text-muted-foreground" />
                            <span className="font-medium">
                              {students.length}
                            </span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
                            Assigned
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="pr-6">
                          <div className="flex flex-wrap justify-end gap-2">
                            {/* Create Exam Modal */}
                            <CreateExamModal
                              courseId={item.courseId}
                              semesterId={item.semesterId}
                              courseTitle={
                                course?.title ?? "Untitled Course"
                              }
                              courseCode={course?.code}
                            />

                            {/* Students Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => {
                                console.log(
                                  "View students:",
                                  item.id,
                                  students,
                                );
                              }}
                            >
                              <Users className="size-4" />
                              <span className="hidden lg:inline">
                                Students
                              </span>
                            </Button>

                            {/* Details Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => {
                                console.log("View course:", item.id);
                              }}
                            >
                              <Eye className="size-4" />
                              <span className="hidden lg:inline">
                                Details
                              </span>
                              <ArrowUpRight className="size-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTable;