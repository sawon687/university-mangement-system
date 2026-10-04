"use client";
import React, { useState } from "react";
import { BookOpen, MoreHorizontal, Search, UserPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import CoursesSheetSide from "./course-assign-sheet";
import { useGetDepartment } from "../../../hooks/department.hook";
import { IDepartment } from "../../../type";

import { useDebaunce } from "../../../hooks/debaunce.hook";
import { useParams } from "../../../hooks/params.hook";
import { useSearchParams } from "next/navigation";
import { QueryParms } from '../../../type/courses.type';
import { getCourseAsssignmentData } from '../../../api/courses.api';
import { useGetAssignmentData } from '../../../hooks/courses.hook';
import { DepartmentTableSkeleton } from '../../loading/department-loading/department-Skelation-Table';
// const courses = [
//   {
//     id: "7d6e64ef-4c5e-44de-990c-8a96f2441d67",
//     title: "Discrete Mathematics",
//     code: "CSE-103",
//     credit: 3,
//     semesterNumber: 1,
//     status: "UNASSIGNED",
//     department: {
//       id: "342c09b0-f962-4966-b1d7-70a7bbf7b9cd",
//       name: "Computer Science and Engineering",
//       code: "CSE",
//     },
//   },
//   {
//     id: "2",
//     title: "Data Structures",
//     code: "CSE-105",
//     credit: 3,
//     semesterNumber: 1,
//     status: "ASSIGNED",
//     instructor: "Md. Rahman",
//     department: {
//       id: "342c09b0-f962-4966-b1d7-70a7bbf7b9cd",
//       name: "Computer Science and Engineering",
//       code: "CSE",
//     },
//   },
//   {
//     id: "3",
//     title: "Database Management System",
//     code: "CSE-203",
//     credit: 3,
//     semesterNumber: 2,
//     status: "UNASSIGNED",
//     department: {
//       id: "342c09b0-f962-4966-b1d7-70a7bbf7b9cd",
//       name: "Computer Science and Engineering",
//       code: "CSE",
//     },
//   },
// ];

const instructors = [
  {
    id: "teacher-1",
    name: "Md. Rahman",
    code: "TCH-001",
    departmentId: "342c09b0-f962-4966-b1d7-70a7bbf7b9cd",
  },
  {
    id: "teacher-2",
    name: "A. Hossain",
    code: "TCH-004",
    departmentId: "342c09b0-f962-4966-b1d7-70a7bbf7b9cd",
  },
];

const CouresesTable = () => {
 const [selectDep, setSelectDep] = useState<string>("");
const [seaarchTram, setSearchTram] = useState("");

const search = useDebaunce(seaarchTram, 500);

const searchParams = useSearchParams();

const page = Number(searchParams.get("page") || 1);
const limit = Number(searchParams.get("limit") || 6);

const queryParams: QueryParms = {
  departmentId: selectDep,
  courseSearch: search,
  page,
  limit,
};

const { data: result, isLoading } = useGetAssignmentData(queryParams);
  const courses = result?.data?.course || [];
  const instructor=result?.data?.instructor || []
  console.log("result", courses);
  const { data } = useGetDepartment("");
  console.log("selectDept", selectDep);
  const departments: IDepartment[] = (data?.data ?? []) as IDepartment[];
  const depvalue = departments.find((dep) => dep.id == selectDep);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Academic Courses</CardTitle>

          <CardDescription>
            Assign instructors to courses based on their department.
          </CardDescription>

          {/* Filters */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by course name or code..."
                className="pl-9"
                onChange={(e) => setSearchTram(e.target.value)}
              />
            </div>

            <Select
              value={selectDep}
              onValueChange={(value) => setSelectDep(value ?? "")}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Departments">
                  {depvalue?.name}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments?.map((dep) => (
                  <SelectItem key={dep.id} value={String(dep.id)}>
                    {dep.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {isLoading ? (
                Array.from({length:6}).map((_,index)=>{
                     <DepartmentTableSkeleton />
                })
                ) : (
                  courses.map((course: any) => (
                  <TableRow key={course.id}>
                    {/* Course */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                          <BookOpen className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium">{course.title}</p>

                          <p className="text-xs text-muted-foreground">
                            {course.code}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Department */}
                    <TableCell>
                      <div>
                        <p className="font-medium">{course.department.code}</p>

                        <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                          {course.department.name}
                        </p>
                      </div>
                    </TableCell>

                    {/* Credit */}
                    <TableCell>{course.credit}</TableCell>

                    {/* Semester */}
                    <TableCell>Semester {course.semesterNumber}</TableCell>

                    {/* Instructor */}
                    <TableCell>
                      {course.status === "ASSIGNED" ? (
                        <div>
                          <p className="font-medium">{course.instructor}</p>

                          <Badge variant="secondary" className="mt-1">
                            Assigned
                          </Badge>
                        </div>
                      ) : (
                        <Badge variant="outline">Unassigned</Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {/* Assign */}
  
                        {course.status === "UNASSIGNED" && <CoursesSheetSide course={course} instructors={instructor}  />}
                      </div>
                    </TableCell>
                  </TableRow>
                   ))
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouresesTable;
