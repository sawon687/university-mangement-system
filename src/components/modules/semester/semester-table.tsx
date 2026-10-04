"use client";

import React from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllPrograms } from '../../../api/program.api';
import SemesterCreate from '../../modal/create-semester-modal';

const semesters = [
  {
    id: "sem-001",
    name: "SPRING",
    year: 2026,
    startDate: "2026-01-10",
    endDate: "2026-05-20",
    registrationOpen: true,
  },
  {
    id: "sem-002",
    name: "SUMMER",
    year: 2026,
    startDate: "2026-06-01",
    endDate: "2026-09-15",
    registrationOpen: true,
  },
  {
    id: "sem-003",
    name: "FALL",
    year: 2026,
    startDate: "2026-10-01",
    endDate: "2027-01-20",
    registrationOpen: false,
  },
  {
    id: "sem-004",
    name: "SPRING",
    year: 2027,
    startDate: "2027-01-15",
    endDate: "2027-05-25",
    registrationOpen: false,
  },
];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SemesterTable = () => {
 
    // console.log('data programs',data)
  return (
    <Card className="overflow-hidden rounded-xl border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/20 px-5 py-4">
        <div>
          <CardTitle className="text-base font-semibold">
            Academic Semesters
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage academic semesters and registration periods.
          </p>
        </div>

     <SemesterCreate/>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/10">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Semester
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Academic Year
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Start Date
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  End Date
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Registration
                </th>
              </tr>
            </thead>

            <tbody>
              {semesters.map((semester) => (
                <tr
                  key={semester.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/20"
                >
                  {/* Semester */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarDays className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {semester.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Semester
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Year */}
                  <td className="px-5 py-4">
                    <span className="font-medium">
                      {semester.year}
                    </span>
                  </td>

                  {/* Start */}
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground">
                      {formatDate(semester.startDate)}
                    </span>
                  </td>

                  {/* End */}
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground">
                      {formatDate(semester.endDate)}
                    </span>
                  </td>

                  {/* Registration */}
                  <td className="px-5 py-4">
                    {semester.registrationOpen ? (
                      <Badge
                        variant="outline"
                        className="gap-1.5 rounded-full border-green-500/20 bg-green-500/10 text-green-600"
                      >
                        <CircleCheck className="size-3.5" />
                        Open
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="gap-1.5 rounded-full"
                      >
                        <Clock3 className="size-3.5" />
                        Closed
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator />

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1</span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {semesters.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {semesters.length}
            </span>{" "}
            semesters
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SemesterTable;