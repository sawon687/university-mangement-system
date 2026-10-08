import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { FileText, FileUp, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FieldError } from "../../ui/field"; // FieldError import koro
import {
  fileAcceptsSize,
  fileAcceptsType,
} from "../../../validation/admission-application.validation";
import { formateFileSize } from '../../../utils/formate-file-size';

type FileUploadProps = {
  label: string;
  description?: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
};

const FileUpload = ({
  label,
  description,
  value,
  onChange,
  error,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (value.type.startsWith("image/")) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-foreground">{label}</Label>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>

      {!value ? (
        <label className="group flex h-20 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-input bg-muted/30 px-4 transition-all hover:border-primary/50 hover:bg-muted/50">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <FileUp className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-foreground">
              Click to upload document
            </p>
            <p className="text-[11px] text-muted-foreground">
              SVG, PNG, JPG or PDF (max. 5MB)
            </p>
          </div>
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setLocalError(null);

              if (!file){ 
                 setLocalError("File or Images Required");
                
                return;}


              if (!fileAcceptsSize(file.size)) {
                setLocalError("File size exceeds the 5MB limit.");
                e.currentTarget.value = "";
                
                return;
              }

              if (!fileAcceptsType(file.type)) {
                setLocalError("Invalid file format. Use SVG, PNG, JPG, or PDF.");
                e.currentTarget.value = "";
                return;
              }

              onChange(file);
              e.currentTarget.value = "";
            }}
          />
        </label>
      ) : (
        <div className="relative overflow-hidden rounded-xl border bg-muted/30 p-3">
          {preview ? (
            <div className="flex items-center gap-3">
              <img
                src={preview}
                alt={value.name}
                className="size-12 rounded-lg object-cover border"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {value.name}
                </p>
                <p className="text-[11px] text-muted-foreground">Image file ready</p>
                  <p className="text-[11px] text-muted-foreground">{formateFileSize(value.size)}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  setLocalError(null);
                  onChange(undefined);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {value.name}
                </p>
                <p className="text-[11px] text-muted-foreground">Document attached</p>
                    <p className="text-[11px] text-muted-foreground">{formateFileSize(value.size)}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  setLocalError(null);
                  onChange(undefined);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* FieldError component use kora holo */}
      {(error || localError) && (
        <FieldError>{error || localError}</FieldError>
      )}
    </div>
  );
};

export default FileUpload;