"use client";
import React from "react";
import {  CardContent} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDepartment } from "../../../type";
import {
  Building2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "../../ui/button";
import { DepartmentTableSkeleton } from "../../loading/department-loading/department-Skelation-Table";

interface props {
  departments: IDepartment[];
  loading: boolean;
}
const DepartmentsTable = ({ departments, loading }: props) => {
  return (
    <>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Instructors</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="w-12 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading
                ? Array.from({ length: 6 }, (_, index) => (
                    <DepartmentTableSkeleton key={index} />
                  ))
                : departments?.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="size-5 text-primary" />
                          </div>

                          <div>
                            <p className="font-medium">{department.name}</p>

                            <p className="max-w-[280px] truncate text-xs text-muted-foreground">
                              {department.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">{department.code}</Badge>
                      </TableCell>

                      <TableCell>{department._count.students}</TableCell>

                      <TableCell>{department._count.students}</TableCell>

                      <TableCell>{department._count.program}</TableCell>

                      <TableCell>{department._count.course}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="mr-2 size-4" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </>
  );
};

export default DepartmentsTable;
