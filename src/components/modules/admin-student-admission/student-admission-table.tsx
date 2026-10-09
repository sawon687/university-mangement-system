"use client";
import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SelectResultDocuments from "../../modal/SelectResultDocuments";
import { usegetStatusBadge } from "../../../hooks/badgeStatus.hook";
import { useAdminGetAdmission } from "../../../hooks/admission-application.hook";
import StudentReview from "./admission-Review.sheet";
import { useDebaunce } from '../../../hooks/debaunce.hook';

const admissionStatuses = ["PENDING", "ACCEPTED", "REJECTED", "PAID", "All"] as const;
type AdmissionStatus = (typeof admissionStatuses)[number];

const StudentAdmissionTable = () => {
  const [searchTram,setSearchTram]=useState('All')
  const [status,setStatus]=useState<AdmissionStatus | undefined>(undefined)
  const search=useDebaunce(searchTram,300)
  const { data } = useAdminGetAdmission({search,status});
  console.log('status',status,'seach',search)
  const applications = data?.data || [];
  console.log("data admision", data);
  return (
    <div>
      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">All Applications</h2>
            <p className="mt-1 text-xs text-slate-500">
              Review applicants and their submitted documents.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
               placeholder="Search student..." className="pl-9" 
               onChange={(e)=> setSearchTram(e.target.value)}
               />
            </div>

            <Select
              onValueChange={(value: string | null) =>
                setStatus(admissionStatuses.find((option) => option === value))
              }
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All statuses</SelectItem>
                {admissionStatuses.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>SSC Result</TableHead>
                <TableHead>HSC Result</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((application: any) => (
                <TableRow
                  key={application.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-100 font-semibold text-orange-700">
                          {application.user.name
                            .split(" ")
                            .map((part: any) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {application?.user?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {application?.user?.email}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {application?.studentProfile?.studentId}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className=" font-medium text-wrap text-slate-800">
                      {application.program.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {application.id}
                    </p>
                  </TableCell>

                  <TableCell>
                    <SelectResultDocuments document={application.sscResult} />
                  </TableCell>

                  <TableCell>
                    <SelectResultDocuments document={application.hscResult} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-slate-500">
                    {application.submittedAt}
                  </TableCell>

                  <TableCell>{usegetStatusBadge(application.status)}</TableCell>

                  <TableCell className="text-right">
                    <StudentReview reviewData={application} />
                  </TableCell>
                </TableRow>
              ))}

              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <Search className="mx-auto mb-2 h-6 w-6 text-slate-300" />
                    <p className="font-medium">No applications found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing the search or status filter.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t bg-slate-50/50 px-4 py-3 text-xs text-slate-500">
          Showing {applications.length} of {applications.length} applications
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionTable;
