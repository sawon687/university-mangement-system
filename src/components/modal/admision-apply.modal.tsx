"use client";

import {  useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import AdmissionApplyForm from '../form/admission-apply-form';



const AdmissionApply = ({programId}:{programId:string}) => {
  const [open, setOpen] = useState(false);

 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          Apply Now
          <ArrowRight className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "fixed left-1/2 top-1/2 z-50",

          "flex h-[90vh] max-h-[720px] w-[calc(100vw-2rem)]",

          "max-w-[420px] -translate-x-1/2 -translate-y-1/2",

          "flex-col gap-0 overflow-hidden p-0",

          "sm:w-[calc(100vw-2rem)] sm:max-w-lg",

          "lg:max-w-2xl",
        )}
      >
        {/* Header */}
        <DialogHeader className="border-b bg-muted/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold">
                Apply for Admission
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Provide your academic details and upload required documentation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Container wrapping both scrollable body and footer */}
        <AdmissionApplyForm programId={programId} onClose={()=> setOpen(false)} />

      </DialogContent>
    </Dialog>
  );
};

export default AdmissionApply;
