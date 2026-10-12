"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { usegetStatusBadge } from '../../../hooks/badgeStatus.hook'
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import CoursesSheetSide from "./course-assign-sheet";
import { useGetDepartment } from "../../../hooks/department.hook";
import { IDepartment } from "../../../type";

import { useDebaunce } from "../../../hooks/debaunce.hook";
import { ICourse, QueryParms } from "../../../type/courses.type";
import { useGetAssignmentData } from "../../../hooks/courses.hook";
import { DepartmentTableSkeleton } from "../../loading/department-loading/department-Skelation-Table";
import UsePagination from "../../../hooks/usepagenation.hook";
import { MetaData } from "../../../type/program.type";

const CouresesTable = () => {
  const [selectDep, setSelectDep] = useState<string>("");
  const [seaarchTram, setSearchTram] = useState("");
 const [page, setPage] = useState(1);
  const search = useDebaunce(seaarchTram, 500);
  const limit = 6;
 
useEffect(()=>{
  setPage(1)
},[search,selectDep])
  const queryParams: QueryParms = {
    departmentId: selectDep=='all'?"":selectDep,
    courseSearch: search,
    page,
    limit,
  };
  

  const { data: result, isLoading,isError } = useGetAssignmentData(queryParams);
  const courses = result?.data?.course || [];
  const instructor = result?.data?.instructor || [];
  const meta = result?.data?.meta;
  const totalpage=Number(meta?.totalPage)||1
  const currentpage=Number(meta?.currentPage)||1
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
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <DepartmentTableSkeleton key={index} />
                    ))
                  : courses.map((course: ICourse) => (
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
                            <p className="font-medium">
                              {course.department.code}
                            </p>

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
                          
                           
                            {usegetStatusBadge(course.status ?? "UNASSIGNED")}
                          
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {/* Assign */}

                            { course.status === "UNASSIGNED" && (
                              <CoursesSheetSide
                                course={course}
                                instructors={instructor}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
        {!isLoading &&
          !isError &&
          courses.length > 0 && (
            <div className="border-t py-3">
              <UsePagination
                totalPages={totalpage}
                currentPage={currentpage}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CouresesTable;
