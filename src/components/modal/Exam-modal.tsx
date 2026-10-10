
"use client";

import { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExamForm from '../form/Exam-from';



interface CreateExamModalProps {
  courseId: string;
  semesterId: string;
  courseTitle: string;
  courseCode?: string;
}

const CreateExamModal = ({
  courseId,
  semesterId,
  courseTitle,
  courseCode,
}: CreateExamModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            Create Exam
          </Button>
        }
      />

      <DialogContent className="max-h-[90dvh] overflow-y-auto p-0 sm:max-w-xl">
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-semibold">
                Create Exam
              </DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Schedule an examination for your assigned course.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ExamForm
          courseId={courseId}
          semesterId={semesterId}
          courseTitle={courseTitle}
          courseCode={courseCode}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamModal;