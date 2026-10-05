"use client";

import {
  Plus,
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  User2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UsersTable from "../../../../components/modules/users/users-table";
import CreateInstructor from '../../../../components/modal/create-instructor-modal';



const AllUsersPage = () => {
  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <User2 className="size-5" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                All Users
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage students, instructors and administrators.
              </p>
            </div>
          </div>
        </div>

     <CreateInstructor/>
      </div>
      {/* Users Table */}
      <UsersTable />
    </div>
  );
};

export default AllUsersPage;
