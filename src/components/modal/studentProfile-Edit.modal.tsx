
"use client";

import React, { useState } from "react";
import { Pencil, UserRoundPen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import EditStudentProfileForm from "../form/editStudentProfile.form";
import { IStudentProfile } from '../../type';

const StudentProfileEditModal = ({editData}:{editData:IStudentProfile}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            className="h-10 gap-2 rounded-lg px-4 shadow-sm"
          >
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        }
      />

      <DialogContent
        className="overflow-hidden p-0 sm:max-w-lg"
      >
        {/* Header */}
        <DialogHeader className="shrink-0 border-b bg-muted/30 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRoundPen className="size-5" />
            </div>

            <div className="min-w-0 space-y-1 text-left">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Edit Student Profile
              </DialogTitle>

              <DialogDescription className="text-sm leading-relaxed">
                Update your personal and academic information.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Form */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <EditStudentProfileForm editData={editData} onSuccess={()=> setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileEditModal;



