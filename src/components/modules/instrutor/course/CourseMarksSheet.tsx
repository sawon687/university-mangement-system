"use client";

import { useState } from "react";
import {
  ClipboardPenLine,
  GraduationCap,
  Loader2,
  Save,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export interface CourseStudent {
  id: string;
  name: string;
  email?: string;
  studentCode?: string;
}

export interface ICourseMarksPayload {
  studentId: string;
  courseId: string;
  semesterId: string;
  attendanceMarks: number;
  assignmentMarks: number;
  midMarks: number;
  finalExamMarks: number;
}

interface Props {
  courseId: string;
  semesterId: string;
  courseTitle: string;
  courseCode?: string;
  students: CourseStudent[];
  onSubmit: (payload: ICourseMarksPayload) => void;
  isPending?: boolean;
}

export default function CourseMarksSheet({
  courseId,
  semesterId,
  courseTitle,
  courseCode,
  students,
  onSubmit,
  isPending = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CourseStudent | null>(
    null,
  );

  const [attendanceMarks, setAttendanceMarks] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [midMarks, setMidMarks] = useState("");
  const [finalExamMarks, setFinalExamMarks] = useState("");

  const resetForm = () => {
    setSelectedStudent(null);
    setAttendanceMarks("");
    setAssignmentMarks("");
    setMidMarks("");
    setFinalExamMarks("");
  };

  const handleSubmit = () => {
    if (!selectedStudent) return;

    const values = [attendanceMarks, assignmentMarks, midMarks, finalExamMarks];

    if (values.some((value) => value.trim() === "")) {
      return;
    }

    const payload: ICourseMarksPayload = {
      studentId: selectedStudent.id,
      courseId,
      semesterId,
      attendanceMarks: Number(attendanceMarks),
      assignmentMarks: Number(assignmentMarks),
      midMarks: Number(midMarks),
      finalExamMarks: Number(finalExamMarks),
    };

    onSubmit(payload);
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <SheetTrigger
        render={
          <Button size="sm" variant="outline" className="gap-2">
            {" "}
            <ClipboardPenLine className="size-4" />
            Enter Marks{" "}
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="flex w-full flex-col overflow-hidden sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <GraduationCap className="size-5 text-primary" />
            Course Marks Entry
          </SheetTitle>

          <SheetDescription>
            Select a student and enter their course assessment marks.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-3">
          {/* Automatically selected course and semester */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground">
              SELECTED COURSE
            </p>

            <h3 className="mt-1 font-semibold">{courseTitle}</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {courseCode && <Badge variant="secondary">{courseCode}</Badge>}

              <Badge variant="outline">Course ID linked</Badge>
              <Badge variant="outline">Semester linked</Badge>
            </div>
          </div>

          {/* Student selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Select Student</label>

              <Badge variant="secondary">
                <Users className="mr-1 size-3" />
                {students.length} Students
              </Badge>
            </div>

            {students.length === 0 ? (
              <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                No students enrolled in this course.
              </p>
            ) : (
              <div className="space-y-2">
                {students.map((student) => {
                  const selected = selectedStudent?.id === student.id;

                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => {
                        setSelectedStudent(student);
                        setAttendanceMarks("");
                        setAssignmentMarks("");
                        setMidMarks("");
                        setFinalExamMarks("");
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {student.name
                          ?.split(" ")
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase() || "S"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {student.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {student.studentCode || student.email || "Student"}
                        </p>
                      </div>

                      {selected && <Badge>Selected</Badge>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedStudent && (
            <>
              <Separator />

              <div className="space-y-1">
                <h3 className="font-semibold">Assessment Marks</h3>
                <p className="text-sm text-muted-foreground">
                  Enter marks for {selectedStudent.name}.
                </p>
              </div>

              {/* IDs are kept in state, not shown as editable fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Attendance Marks
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={attendanceMarks}
                    onChange={(e) => setAttendanceMarks(e.target.value)}
                    placeholder="Enter attendance marks"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Assignment Marks
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={assignmentMarks}
                    onChange={(e) => setAssignmentMarks(e.target.value)}
                    placeholder="Enter assignment marks"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Midterm Marks</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={midMarks}
                    onChange={(e) => setMidMarks(e.target.value)}
                    placeholder="Enter midterm marks"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Final Exam Marks
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={finalExamMarks}
                    onChange={(e) => setFinalExamMarks(e.target.value)}
                    placeholder="Enter final marks"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                Student ID, Course ID and Semester ID will be submitted
                automatically. The backend calculates the final grade.
              </div>
            </>
          )}
        </div>

        <SheetFooter className="border-t">
          <SheetClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            disabled={
              !selectedStudent ||
              isPending ||
              [attendanceMarks, assignmentMarks, midMarks, finalExamMarks].some(
                (value) => value.trim() === "",
              ) ||
              [attendanceMarks, assignmentMarks, midMarks, finalExamMarks].some(
                (value) => !Number.isFinite(Number(value)) || Number(value) < 0,
              )
            }
            onClick={handleSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 size-4" />
                Save Marks
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
