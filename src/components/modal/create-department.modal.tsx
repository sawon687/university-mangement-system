'use client'
import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DepartmentFrom from '../form/department-from';
import { useState } from 'react';

const DepartmentCreate = () => {
    const [open ,setOpen]=useState(false)
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button >
            <Plus className="mr-2 size-4" />
            Add Department
          </Button>
        }
      />

      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg">Create Department</DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Create a new academic department and configure its basic
                information.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <DepartmentFrom onClose={()=> setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentCreate;
