"use client";

import React, { useState } from "react";
import { BookOpen, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateCourseFrom from '../form/create-course-from';



const CreateCourse = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-lg">
            <Plus className="mr-2 size-4" />
            Create Course
          </Button>
        }
      />

      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">
                Create New Course
              </DialogTitle>

              <DialogDescription className="text-sm">
                Add a new course and configure its academic information.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="px-5 pb-5">
          <CreateCourseFrom onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourse;