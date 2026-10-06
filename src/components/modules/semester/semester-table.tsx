"use client";

import React from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SemesterCreate from "../../modal/create-semester-modal";
import { useGetSemester, useSemester } from '../../../hooks/semester.hook';
import { ISemester } from '../../../type/semester.type';

// const semesters = [
//   {
//     id: "sem-001",
//     name: "SPRING",
//     year: 2026,
//     startDate: "2026-01-10",
//     endDate: "2026-05-20",
//     registrationOpen: true,
//   },
//   {
//     id: "sem-002",
//     name: "SUMMER",
//     year: 2026,
//     startDate: "2026-06-01",
//     endDate: "2026-09-15",
//     registrationOpen: true,
//   },
//   {
//     id: "sem-003",
//     name: "FALL",
//     year: 2026,
//     startDate: "2026-10-01",
//     endDate: "2027-01-20",
//     registrationOpen: false,
//   },
//   {
//     id: "sem-004",
//     name: "SPRING",
//     year: 2027,
//     startDate: "2027-01-15",
//     endDate: "2027-05-25",
//     registrationOpen: false,
//   },
// ];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SemesterTable = () => {
  const {data}=useGetSemester()
  const  semesters=data?.data|| []
  console.log('semester',semesters)
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

        <SemesterCreate type={'create'} />
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10 hover:bg-muted/10">
                <TableHead className="px-5">Semester</TableHead>
                <TableHead className="px-5">Academic Year</TableHead>
                <TableHead className="px-5">Start Date</TableHead>
                <TableHead className="px-5">End Date</TableHead>
                <TableHead className="px-5">Registration</TableHead>
                 <TableHead className="px-5">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {semesters?.map((semester:ISemester) => (
                <TableRow
                  key={semester.id}
                  className="hover:bg-muted/20"
                >
                  {/* Semester */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarDays className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">{semester.name}</p>

                        <p className="text-xs text-muted-foreground">
                          Semester
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Year */}
                  <TableCell className="px-5 py-4">
                    <span className="font-medium">{semester.year}</span>
                  </TableCell>

                  {/* Start */}
                  <TableCell className="px-5 py-4">
                    <span className="text-muted-foreground">
                      {formatDate(semester.startDate)}
                    </span>
                  </TableCell>

                  {/* End */}
                  <TableCell className="px-5 py-4">
                    <span className="text-muted-foreground">
                      {formatDate(semester.endDate)}
                    </span>
                  </TableCell>

                  {/* Registration */}
                  <TableCell className="px-5 py-4">
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
                  </TableCell>
                  <TableCell>
                    {semester.id && (
                      <SemesterCreate
                        editData={semester}
                        type="edit"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator />

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">1</span>{" "}
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