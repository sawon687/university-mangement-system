"use client";
import React, { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Search,
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usegetStatusBadge } from "../../../hooks/badgeStatus.hook";
import { useGetUsers } from "../../../hooks/users.hook";
import { IDepartment, IUser } from "../../../type";
import { getDepartments } from "../../../api/deparment.api";
import { useDebaunce } from "../../../hooks/debaunce.hook";
import { QueryParms } from "../../../type/courses.type";
const users = [
  {
    id: 1,
    name: "Md. Al Jihad",
    email: "jihad@example.com",
    role: "ADMIN",
    department: "Administration",
    status: "ACTIVE",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Md. Rahim Uddin",
    email: "rahim@example.com",
    role: "INSTRUCTOR",
    department: "Computer Science & Engineering",
    status: "ACTIVE",
    initials: "RU",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "INSTRUCTOR",
    department: "Business Administration",
    status: "ACTIVE",
    initials: "NJ",
  },
  {
    id: 4,
    name: "Sakib Hasan",
    email: "sakib@example.com",
    role: "STUDENT",
    department: "Computer Science & Engineering",
    status: "ACTIVE",
    initials: "SH",
  },
  {
    id: 5,
    name: "Mim Akter",
    email: "mim@example.com",
    role: "STUDENT",
    department: "English",
    status: "PENDING",
    initials: "MA",
  },
  {
    id: 6,
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    role: "STUDENT",
    department: "Electrical & Electronic Engineering",
    status: "ACTIVE",
    initials: "TA",
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "ADMIN":
      return (
        <Badge variant="secondary" className="gap-1">
          <ShieldCheck className="size-3" />
          Admin
        </Badge>
      );

    case "INSTRUCTOR":
      return (
        <Badge variant="secondary" className="gap-1">
          <BriefcaseBusiness className="size-3" />
          Instructor
        </Badge>
      );

    case "STUDENT":
      return (
        <Badge variant="secondary" className="gap-1">
          <GraduationCap className="size-3" />
          Student
        </Badge>
      );

    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};
const UsersTable = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [department, setDepartment] = useState("All Department");
  const [role, setRole] = useState<
    "ADMIN" | "STUDENT" | "INTRUCTOR" | "All Role"
  >("All Role");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const userSearch = useDebaunce(search, 300);
  const params: QueryParms = {
    role,
    status,
    department,
    userSearch,
  };
  const { data, isLoading } = useGetUsers(params);
  const users = data?.data || [];

  useEffect(() => {
    getDepartments("").then((result) => setDepartments(result?.data ?? []));
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-lg">User Directory</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage all system users.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search users..."
                  className="w-full pl-9 sm:w-[340px]"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              {/* deparments */}
              <Select
                value={department}
                onValueChange={(value) =>
                  setDepartment(value ?? "All Department")
                }
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Deparment">All Departments</SelectItem>
                  {departments?.map((dep) => (
                    <SelectItem key={dep.id} value={String(dep.code)}>
                      {dep.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Role */}
              <Select
                value={role}
                onValueChange={(value) => setRole(value ?? "All Role")}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Role">All Roles</SelectItem>
                  {["ADMIN", "STUDENT", "INTRUCTOR"].map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status */}
              <Select
                value={status}
                onValueChange={(value) => setStatus(value??'')}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Status">All status</SelectItem>
                  {["ACTIVE", "PENDING"].map((status) => (
                    <SelectItem value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px] pr-6" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user: IUser) => (
                  <TableRow key={user.id}>
                    {/* User */}
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                            {user.name.slice(0, 1).toLocaleUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="font-medium">{user.name}</p>

                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>{usegetStatusBadge(user.role)}</TableCell>

                    {/* Department */}
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.instructor?.department?.name}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{usegetStatusBadge(user.userStatus)}</TableCell>

                    {/* Actions */}
                    <TableCell className="pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserRound className="mr-2 size-4" />
                            View Profile
                          </DropdownMenuItem>

                          <DropdownMenuItem>Edit User</DropdownMenuItem>

                          <DropdownMenuItem>Change Status</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete User
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
      </Card>
    </div>
  );
};

export default UsersTable;
