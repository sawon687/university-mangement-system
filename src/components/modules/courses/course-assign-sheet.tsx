"use client";

import { useState } from "react";
import {
  Mail,
  Search,
  UserRound,
  Building2,
  BadgeCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ICourse } from '../../../type/courses.type';
import { IUser } from '../../../type';




const ITEMS_PER_PAGE = 2;
interface props{
course:ICourse&{id:string}
instructors:IUser[]
}
export default function CoursesSheetSide({course,instructors}:props) {
  const [selectedInstructorId, setSelectedInstructorId] = useState<
    string | null
  >(null);

  console.log('instrutorr',instructors)
  console.log('course',course)

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(instructors.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentInstructors = instructors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const selectedInstructor = instructors.find(
    (instructor) => instructor.id === selectedInstructorId,
  );

  const handleAssign = () => {
    if (!selectedInstructorId) {
      return;
    }

    const assignmentData = {
      courseId: course.id,
      instructorId: selectedInstructorId,
    };

    console.log("Assignment Data:", assignmentData);

    // API call later
    // assignCourseMutation.mutate(assignmentData)
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="default" className="capitalize">
              Assign
            </Button>
          }
        />

        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <GraduationCap className="size-5" />
              Assign Course
            </SheetTitle>

            <SheetDescription>
              Select an instructor to assign this course. You can search
              instructors by name or email.
            </SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            {/* Course Information */}
            <div className="px-4">
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      SELECTED COURSE
                    </p>

                    <h3 className="mt-1 text-base font-semibold">
                      {course.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{course.code}</Badge>

                      <span className="text-xs text-muted-foreground">
                        {course.credit} Credits
                      </span>

                      <span className="text-xs text-muted-foreground">•</span>

                      <span className="text-xs text-muted-foreground">
                        Semester {course.semesterNumber}
                      </span>
                    </div>
                  </div>

                  <Badge variant="outline">
                    {selectedInstructor ? "Instructor Selected" : "Unassigned"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Instructor Search */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search by instructor name or email..."
                  className="h-10 pl-9"
                />
              </div>
            </div>

            {/* Instructor List */}
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Select Instructor</p>

                  <p className="text-xs text-muted-foreground">
                    {instructors.length} instructors available
                  </p>
                </div>

                {selectedInstructor && (
                  <Badge variant="secondary">Selected</Badge>
                )}
              </div>

              <div className="space-y-2">
                {currentInstructors.map((instructor) => {
                  const isSelected = selectedInstructorId === instructor.id;

                  return (
                    <button
                      key={instructor.id}
                      type="button"
                      onClick={() => setSelectedInstructorId(instructor.id)}
                      className={`group w-full rounded-xl border p-3 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-orange-50/50 dark:bg-orange-950/20"
                          : "bg-background hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                            {instructor.name
                              .split(" ")
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {/* Main Information */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold">
                              {instructor.name}
                            </p>

                            <Badge
                              variant="secondary"
                              className="hidden shrink-0 text-[10px] sm:inline-flex"
                            >
                              {instructor.userStatus}
                            </Badge>
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="size-3.5" />

                            <span className="truncate">{instructor.email}</span>
                          </div>

                          <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <UserRound className="size-3.5 shrink-0" />

                              <span>{instructor?.instructor?.teacherCode}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <BadgeCheck className="size-3.5 shrink-0" />

                              <span className="truncate">
                                {instructor?.instructor?.designation}
                              </span>
                            </div>
                          </div>

                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Building2 className="size-3.5 shrink-0" />

                            <span className="truncate">
                              {instructor?.instructor?.department?.name}
                            </span>
                          </div>
                        </div>

                        {/* Selected Icon */}
                        {isSelected && (
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                            <Check className="size-3.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="border-t">
            <SheetClose render={<Button variant="outline">Cancel</Button>} />

            <Button
              type="button"
              disabled={!selectedInstructorId}
              onClick={handleAssign}
            >
              Assign Course
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
