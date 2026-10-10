"use client";

import React, { useEffect, useState } from "react";
import Acadamicsummry from "./acadamic-summry";
import { useGetStudentEnrolement } from "../../../hooks/enrolements.hook";
import { IEnrollment } from "../../../type";
import SemesterCourses from "./semester-courses";
import {
CalendarDays,
CheckCircle2,
GraduationCap,
} from "lucide-react";

import { Badge } from "../../ui/badge";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "../../ui/select";

import { useStudentSemester } from "../../../hooks/semester.hook";
import { ISemester } from "../../../type/semester.type";
import FeeSemester from './fee-semester';

const StudentSemesterCorse = () => {
const [selectedSemester, setSelectedSemester] = useState<string>("");

const semesterData = useStudentSemester();
const semesters: ISemester[] = semesterData?.data?.data ?? [];

useEffect(() => {
if (!selectedSemester && semesters.length > 0) {
setSelectedSemester(String(semesters[0].id));
}
}, [semesters, selectedSemester]);

const { data: enrollmentResponse, isLoading: enrollmentLoading } =
useGetStudentEnrolement(selectedSemester);

const enrolements: IEnrollment | undefined =
enrollmentResponse?.data ?? undefined;

const currentSemester = semesters.find(
(semester) => String(semester.id) === selectedSemester,
);

return ( <div className="mx-auto max-w-7xl space-y-7"> <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"> <div> <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"> <GraduationCap className="h-4 w-4 text-orange-500" /> <span>Student Portal</span> <span>/</span> <span className="text-foreground">My Semester</span> </div>


      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        My Semester
      </h1>

      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        Explore your semester, enrolled courses, academic credits, and
        semester fee details in one place.
      </p>
    </div>

    <Badge
      variant="outline"
      className="w-fit gap-1.5 border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
    >
      <CheckCircle2 className="h-4 w-4" />
      Enrollment Overview
    </Badge>
  </header>

  <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 p-5 text-white shadow-sm sm:p-7">
    <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border-[32px] border-white/[0.08]" />

    <div className="pointer-events-none absolute -bottom-28 -right-28 h-56 w-56 rounded-full bg-white/[0.07]" />

    <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_300px] lg:items-center">
      <div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <CalendarDays className="h-4 w-4" />
          Your academic journey
        </div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {currentSemester
            ? `${currentSemester.name} ${currentSemester.year}`
            : "My Academic Semester"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/80">
          Your semester details, registered subjects, and fee overview.
        </p>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
          <CalendarDays className="h-4 w-4" />
          Select semester
        </label>

            <Select
              value={selectedSemester}
              onValueChange={(value) => setSelectedSemester(value ?? "")}
            >
              <SelectTrigger className="h-12 border-white/20 bg-white text-slate-900">
                {currentSemester ? (
                  <span>
                    {currentSemester.name} {currentSemester.year}
                  </span>
                ) : (
                  <SelectValue placeholder="Choose semester" />
                )}
              </SelectTrigger>

              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.id} value={String(semester.id)}>
                    {semester.name} {semester.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

        <p className="mt-3 text-xs leading-5 text-white/75">
          Select a semester to update your courses and fee information.
        </p>
      </div>
    </div>
  </section>

  <Acadamicsummry
    totalCredit={enrolements?.totalCredit ?? 0}
    totalSubject={enrolements?.Enrolementcourses?.length ?? 0}
    semesterName={
      currentSemester
        ? `${currentSemester.name} ${currentSemester.year}`
        : "N/A"
    }
  />
  {/* fee semetere */}
 <FeeSemester semesterId={selectedSemester}/>

  {enrollmentLoading ? (
    <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
      Loading semester courses...
    </div>
  ) : (
    <SemesterCourses
      Enrolementcourses={enrolements?.Enrolementcourses ?? []}
    />
  )}
 
</div>


);
};

export default StudentSemesterCorse;
