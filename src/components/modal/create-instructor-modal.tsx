"use client";

import {  Plus, Users2 } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import CreateIntructorForm from '../form/create-intructor-form';
import { Button } from '../ui/button';

const CreateInstructor = () => {
  const [open, setOpen] = useState(false);
 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button ><Plus/> Create Instructor</Button>} />

      <DialogContent className="overflow-hidden p-0 sm:max-w-3xl">
        {/* Header */}
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Users2 className="size-5 text-primary" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg">Create Instructolr</DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Create a new academic semester and set its duration.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
       {/* form */}
   <CreateIntructorForm/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstructor;
