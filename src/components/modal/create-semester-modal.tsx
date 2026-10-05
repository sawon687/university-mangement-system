"use client";

import { Plus, Users2 } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateIntructorForm from "../form/create-intructor-form";
import { Button } from "../ui/button";

const CreateInstructor = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="size-4" />
            Create Instructor
          </Button>
        }
      />

      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        {/* Dialog Header */}
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <Users2 className="size-5" />
            </div>

            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-semibold">
                Create Instructor
              </DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Create a new instructor account for your university.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <CreateIntructorForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstructor;