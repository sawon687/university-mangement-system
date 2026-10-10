import React, { ElementType } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Building2, GraduationCap, Hash, UserRound } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { CardContent } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { ICourseEnrollment } from '../../../type';

const SemesterCourses = ({
Enrolementcourses
}:{Enrolementcourses:ICourseEnrollment[]}) => {
console.log('enrolemt',Enrolementcourses)
 
  return (
    <div>
      {Enrolementcourses.length > 0 ? (
        <CardContent className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
          {Enrolementcourses.map((enrolements,index) => (
            <article
              key={enrolements.courseId}
              className="group flex min-w-0 flex-col rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.04] dark:hover:border-orange-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-950/40 dark:text-orange-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="max-w-[60%] truncate">
                  {enrolements?.course?.code}
                </Badge>
              </div>

              <div className="mt-4 flex-1">
                <p className="text-xs font-semibold tracking-wide text-orange-600 dark:text-orange-400">
                  SUBJECT {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 min-h-12 text-base font-semibold leading-6">
                  {enrolements?.course?.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {enrolements?.course?.description}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <InfoRow icon={Hash} label="Course code" value={enrolements?.course?.code} />
                <InfoRow
                  icon={GraduationCap}
                  label="Credit hours"
                  value={`${enrolements?.course?.credit} credits`}
                />
                {/* <InfoRow
                  icon={UserRound}
                  label="Instructor"
                  value={course.instructor}
                /> */}
                <InfoRow
                  icon={Building2}
                  label="Department"
                  value={enrolements?.course.department.name}
                />
              </div>

              <Button
                variant="outline"
                // onClick={() => setSelectedCourse(course)}
                className="mt-5 w-full justify-between hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950/30"
              >
                View course details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </article>
          ))}
        </CardContent>
      ) : (
        <CardContent className="flex flex-col items-center px-5 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <BookOpen className="h-7 w-7 text-muted-foreground" />
          </div>
          {/* <h3 className="mt-4 font-semibold">
            {activeEnrollment ? "No matching courses" : "No enrollment found"}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {activeEnrollment
              ? "Try searching with another course name, code, or instructor."
              : "You are not enrolled in the selected semester."}
          </p>
          {search && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearch("")}
            >
              Clear search
            </Button>
          )} */}
        </CardContent>
      )}
    </div>
  );
};

export default SemesterCourses;
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="w-[88px] shrink-0 text-xs text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0 flex-1 break-words text-right text-xs leading-5 font-medium">
        {value}
      </span>
    </div>
  );
}