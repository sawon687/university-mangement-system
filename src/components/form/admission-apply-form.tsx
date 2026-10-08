"use client";
import { useForm } from "@tanstack/react-form";
import React from "react";
import z from "zod";
import FileUpload from "../modules/admission/fileupdaoded";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "cn";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { admissionSchema } from "../../validation/admission-application.validation";
import { EducationType } from "../../type/admisson-applilcation.type";
import { useAdmissionApplication } from "../../hooks/admission-application.hook";
import { toast } from "../ui/toast";
interface AdmissionApplicationProps {
  programId: string;
  onClose: () => void;
}
const AdmissionApplyForm = ({
  programId,
  onClose,
}: AdmissionApplicationProps) => {
  const { mutate: application, isPending } = useAdmissionApplication();
  const admissionForm = useForm({
    defaultValues: {
      programId: programId,
      educationType: "HSC" as EducationType,
      sscResult: undefined as File | undefined,
      hscResult: undefined as File | undefined,
      diplomaResult: undefined as File | undefined,
    } as unknown as z.input<typeof admissionSchema>,

    validators: {
      onSubmit: admissionSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Admission Application:", value);
      // TODO: Upload files & submit API

      const addmisionPaylaod = {
        educationType: value.educationType,
        sscResult: value.sscResult,
        hscResult: value.hscResult,
        diplomaResult: value.diplomaResult,

        programId: value.programId,
      };

      console.log("addmission paylaod", addmisionPaylaod);

      application(addmisionPaylaod, {
        onSuccess: (res) => {
          toast.add({
            title: "Application success",
            description: res.message,
            type: "success",
          });
          onClose();
        },

        onError: (error: any) => {
          console.log("erros", error.data);

          toast.add({
            title: "Application feild",
            description: error.data.message || error.errors?.[0].message,
            type: "Error",
          });
          onClose();
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        admissionForm.handleSubmit();
      }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Step 01 */}

        {/* Step 02 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              01
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                SSC Documents
              </h3>
              <p className="text-xs text-muted-foreground">
                Upload your SSC certificate or academic transcript.
              </p>
            </div>
          </div>

          <admissionForm.Field name="sscResult">
            {(field) => (
              <FileUpload
                label="SSC Certificate / Marksheet"
                description="Required"
                value={field.state.value}
                onChange={(file) => field.handleChange(file as File)}
              />
            )}
          </admissionForm.Field>
        </div>

        {/* Step 03 */}
        <admissionForm.Field name="educationType">
          {(field) => (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  02
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Higher Secondary Qualification
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Select your current background.
                  </p>
                </div>
              </div>

              <RadioGroup
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as EducationType)
                }
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <label
                  htmlFor="hsc"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                    field.state.value === "HSC"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-input hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem id="hsc" value="HSC" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">HSC</p>
                    <p className="text-xs text-muted-foreground">
                      Higher Secondary Certificate
                    </p>
                  </div>
                </label>

                <label
                  htmlFor="diploma"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                    field.state.value === "DIPLOMA"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-input hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem id="diploma" value="DIPLOMA" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Diploma
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Diploma in Engineering
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          )}
        </admissionForm.Field>

        {/* Step 04 */}
        <admissionForm.Subscribe
          selector={(state) => state.values.educationType}
        >
          {(educationType) => (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  03
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {educationType === "HSC"
                      ? "HSC Document"
                      : "Diploma Document"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload your final qualification file.
                  </p>
                </div>
              </div>

              {educationType === "HSC" ? (
                <admissionForm.Field name="hscResult">
                  {(field) => (
                    <FileUpload
                      label="HSC Marksheet / Certificate"
                      description="Required"
                      value={field.state.value}
                      onChange={(file) => field.handleChange(file as File)}
                    />
                  )}
                </admissionForm.Field>
              ) : (
                <admissionForm.Field name="diplomaResult">
                  {(field) => (
                    <FileUpload
                      label="Diploma Certificate"
                      description="Required"
                      value={field.state.value}
                      onChange={(file) => field.handleChange(file as File)}
                    />
                  )}
                </admissionForm.Field>
              )}
            </div>
          )}
        </admissionForm.Subscribe>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t bg-muted/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start">
          <CheckCircle2 className="size-4 shrink-0 text-primary" />
          Ensure documents are clear and fully legible.
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            // onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto gap-2"
          >
            {isPending ? (
              <>
                <Spinner className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AdmissionApplyForm;
