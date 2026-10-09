import {
GraduationCap,
FileCheck2,
ShieldCheck,
} from "lucide-react";

import StudentAdmissionTable from "../../../../components/modules/admin-student-admission/student-admission-table";

export default function page() {
return ( <div className="min-h-screen bg-slate-50/70 p-4"> <div className="mx-auto max-w-[1600px] space-y-6">
{/* Breadcrumb */} <div className="flex items-center gap-2 text-sm text-slate-500"> <GraduationCap className="h-4 w-4 text-orange-600" /> <span>Administration</span> <span className="text-slate-300">/</span> <span className="font-medium text-slate-700">Admissions</span> </div>

    {/* Page Header */}
    <div className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:flex-row lg:items-center">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 ring-1 ring-orange-100 sm:h-14 sm:w-14">
          <GraduationCap className="h-7 w-7 text-orange-600" />
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            Admission Applications
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Review student applications, verify academic documents, and
            manage admission requests from one place.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
          <FileCheck2 className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Application Review
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Academic document verification
          </p>
        </div>
      </div>
    </div>

    {/* Verification Notice */}
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      <div>
        <p className="text-sm font-semibold text-slate-800">
          Document Verification
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Check each applicant&apos;s academic results and application
          details carefully before updating the admission status.
        </p>
      </div>
    </div>

    {/* Applications Table */}
    <StudentAdmissionTable />
  </div>
</div>


);
}
