"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FileSearch,
  UserRound,
  Mail,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IAdmissionApplication, ReviewAdmisson } from "../../../type/admisson-applilcation.type";
import { useupdateAdmissionApplication } from '../../../hooks/admission-application.hook';
import { is } from 'date-fns/locale';
import { toast } from '../../ui/toast';

type ReviewStatus = "ACCEPTED" | "REJECTED";

export default function StudentReview({
  reviewData,
}: {
  reviewData: IAdmissionApplication;
}) { 
  const {mutate:updateStatus,isPending}=useupdateAdmissionApplication()
  const [status, setStatus] = useState<ReviewStatus | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [open,setOpen]=useState(false)

  const [error, setError] = useState("");

  const handleReview = async () => {
    setError("");

    if (!status) {
      setError("Please select Accept or Reject.");
      return;
    }

    if (status === "REJECTED" && !rejectionReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }
  const updataData={
     applicationId: reviewData.id,
      status,
      rejectionReason: status === "REJECTED" ? rejectionReason.trim() : undefined,
  }
    updateStatus(updataData, {
      onSuccess: (res) => {
        console.log("response forgot", res);

          toast.add({
            title: "Update success",
            description: res.message,
            type: "success",
          });

          setOpen(false)
         
        },

        

        onError: (err: any) => {
          console.log("error", err);

          toast.add({
            title: "Update filed",
            description:
              err?.data?.message || "Something went wrong. Please try again.",
            type: "error",
          });
          setOpen(false)
        },
      
    });

 
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger 
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <FileSearch className="h-4 w-4" />
            Review
          </Button>
        }
      />

      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-lg">
        <SheetHeader className="border-b px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <FileSearch className="h-5 w-5" />
            </div>

            <div>
              <SheetTitle className="text-lg">
                Admission Application Review
              </SheetTitle>

              <SheetDescription className="mt-1">
                Review the student&apos;s details and make an admission
                decision.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 space-y-6 px-5 py-5">
          {/* Student Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Student Information
            </h3>

            <div className="rounded-xl border bg-slate-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="break-words font-semibold text-slate-900">
                    {reviewData?.user?.name ?? "Unknown Student"}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">
                      {reviewData?.user?.email ?? "No email available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Information */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Application Details
            </h3>

            <div className="space-y-3 rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">Application ID</span>
                <span className="max-w-[60%] break-all text-right text-xs font-medium text-slate-700">
                  {reviewData?.id ?? "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">Current Status</span>

                <Badge variant="outline">
                  {reviewData?.status ?? "PENDING"}
                </Badge>
              </div>
            </div>
          </section>

          {/* Review Decision */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Review Decision
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStatus("ACCEPTED");
                  setRejectionReason("");
                  setError("");
                }}
                className={`h-auto min-h-16 flex-col gap-1.5 py-3 ${
                  status === "ACCEPTED"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                    : "hover:border-emerald-300"
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
                <span>Accept Application</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStatus("REJECTED");
                  setError("");
                }}
                className={`h-auto min-h-16 flex-col gap-1.5 py-3 ${
                  status === "REJECTED"
                    ? "border-red-500 bg-red-50 text-red-700 hover:bg-red-50"
                    : "hover:border-red-300"
                }`}
              >
                <XCircle className="h-5 w-5" />
                <span>Reject Application</span>
              </Button>
            </div>
          </section>

          {/* Rejection Reason */}
          {status === "REJECTED" && (
            <section className="space-y-2">
              <Label htmlFor="rejectionReason">
                Rejection Reason <span className="text-red-500">*</span>
              </Label>

              <Textarea
                id="rejectionReason"
                placeholder="Explain why this application is being rejected..."
                value={rejectionReason}
                onBlur={(e)=> e.target.value=''}
                onChange={(e) => {
                  setRejectionReason(String(e.target.value));
                  setError("");
                }}
                rows={4}
                className="resize-y"
                required
              />

              <p className="text-xs text-slate-500">
                Provide a clear reason so the student understands the decision.
              </p>
            </section>
          )}

          {/* Decision Preview */}
          {status === "ACCEPTED" && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                This application will be marked as accepted after you confirm
                the decision.
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <SheetFooter className="flex-col gap-2 border-t px-5 py-4 sm:flex-row">
          <Button
            type="button"
            onClick={handleReview}
            disabled={!status||isPending}
            className={`w-full gap-2 ${
              status === "REJECTED"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "REJECTED" ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}

            {status === "REJECTED"
              ? "Confirm Rejection"
              : status === "ACCEPTED"
                ? "Confirm Acceptance"
                : "Select a Decision"}
          </Button>

          <SheetClose
            render={
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
