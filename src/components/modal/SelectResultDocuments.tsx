"use client";

import { useState } from "react";
import {
  ExternalLink,
  Eye,
  FileText,
  X,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DocumentData = {
  name?: string;
  url: string;
  publicId?: string;
  type?: string;
  mimeType?: string;
};

const SelectResultDocuments = ({ document }: { document: DocumentData }) => {
  const [open, setOpen] = useState(false);

  // Detect image from MIME type or Cloudinary URL
  const isImage =
    document?.type?.startsWith("image/") ||
    document?.mimeType?.startsWith("image/") ||
    /\.(jpg|jpeg|png|webp|gif|svg|avif)(\?.*)?$/i.test(document?.url ?? "");

  // Fallback document name
  const documentName =
    document?.name ||
    document?.url?.split("/").pop()?.split("?")[0] ||
    "Academic Result";

  const handleOpenDocument = () => {
    if (!document?.url) return;

    window.open(document.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Document Trigger */}
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="group flex h-auto max-w-[180px] items-center gap-2 rounded-xl border-slate-200 bg-white p-2 text-left shadow-none transition-all hover:border-orange-300 hover:bg-orange-50/70"
          >
            {" "}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-orange-50 text-orange-600">
              {isImage ? (
                <img
                  src={document.url}
                  alt={documentName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FileText className="h-5 w-5" />
              )}{" "}
            </div>
            ```
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700 transition-colors group-hover:text-orange-700">
                View Result
              </p>

              <p className="max-w-[100px] truncate text-[10px] text-slate-400">
                {documentName}
              </p>
            </div>
            <Eye className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-orange-600" />
          </Button>
        }
      />

      {/* Document Preview Dialog */}
      <DialogContent className="flex max-h-[92dvh] w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:w-full sm:max-w-3xl">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
              {isImage ? (
                <ImageIcon className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <DialogTitle className="text-base font-semibold text-slate-900 sm:text-lg">
                Academic Result Preview
              </DialogTitle>

              <DialogDescription className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                Review the applicant&apos;s submitted document.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Document Information & Actions */}
        <div className="flex shrink-0 flex-col gap-3 border-b bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white text-slate-500">
              {isImage ? (
                <ImageIcon className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5 text-red-500" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">
                {documentName}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {isImage ? "Image document" : "PDF document"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleOpenDocument}
              className="flex-1 gap-2 bg-white sm:flex-none"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </Button>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
              aria-label="Close document preview"
              className="shrink-0 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-3 sm:p-5">
          <div className="flex min-h-[280px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:min-h-[400px]">
            {!document?.url ? (
              <div className="p-6 text-center text-sm text-slate-500">
                Document URL is not available.
              </div>
            ) : isImage ? (
              <img
                src={document.url}
                alt={documentName}
                className="block max-h-[60dvh] max-w-full object-contain"
              />
            ) : (
              <iframe
                src={document.url}
                title={documentName}
                className="h-[55dvh] min-h-[350px] w-full border-0 sm:h-[60dvh]"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t bg-white px-4 py-3 sm:px-6">
          <p className="text-xs text-slate-500">
            Verify the document before reviewing the application.
          </p>

          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="shrink-0 bg-orange-600 text-white hover:bg-orange-700"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectResultDocuments;
