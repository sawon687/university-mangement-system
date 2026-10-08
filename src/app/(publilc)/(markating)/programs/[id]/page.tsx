import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { getDetilsPublicPrograms } from '../../../../../api/program.public.api';
import { Button } from '../../../../../components/ui/button';
import AdmissionApply from '../../../../../components/modal/admision-apply.modal';



const Page = async({params}:{params:Promise<{id:string}>}) => {
const {id}=await params
const data=await getDetilsPublicPrograms(id)
const program=data?.data
console.log('id detals',id)
  return (
    <main className="min-h-screen bg-[#f8fafc] flex-col justify-center text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Decorative */}
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-8 lg:pb-20 lg:pt-10">
          {/* Back */}
          <Link
            href="/programs"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All Programs
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main Title */}
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-black tracking-wide text-white">
                  {program.degreeType}
                </span>

                <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  {program.isActive ? "Active Program" : "Inactive"}
                </span>

                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {program.department.code}
                </span>
              </div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
                {program.department.name}
              </p>

              <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {program.name}
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-7 text-slate-500">
                {program.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                 <AdmissionApply programId={program.id}/>
                <Button variant='outline' className='px-6 py-5 hover:text-primary hover:border-primary'>
                        Explore Other Programs
                </Button>
             
              </div>
            </div>

            {/* Department Identity */}
            <div className="self-end rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <Building2 className="size-6" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                Department
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                {program.department.name}
              </h2>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-xs font-medium text-slate-500">
                  Department Code
                </span>

                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-orange-600 ring-1 ring-slate-200">
                  {program.department.code}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACADEMIC STATS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4">
          {/* Duration */}
          <div className="group border-b border-slate-200 p-6 transition hover:bg-orange-50/40 sm:border-r lg:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Clock3 className="size-5" />
              </div>

              <span className="text-xs font-bold text-slate-400">
                01
              </span>
            </div>

            <p className="mt-6 text-3xl font-black text-slate-950">
              {program.duration}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Years Duration
            </p>
          </div>

          {/* Credits */}
          <div className="group border-b border-slate-200 p-6 transition hover:bg-orange-50/40 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <GraduationCap className="size-5" />
              </div>

              <span className="text-xs font-bold text-slate-400">
                02
              </span>
            </div>

            <p className="mt-6 text-3xl font-black text-slate-950">
              {program.totalCredits}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Total Credits
            </p>
          </div>

          {/* Semester */}
          <div className="border-b border-slate-200 p-6 transition hover:bg-orange-50/40 sm:border-r lg:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <CalendarDays className="size-5" />
              </div>

              <span className="text-xs font-bold text-slate-400">
                03
              </span>
            </div>

            <p className="mt-6 text-3xl font-black text-slate-950">
              {program.semester}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Total Semesters
            </p>
          </div>

          {/* Semester Type */}
          <div className="p-6 transition hover:bg-orange-50/40">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <BookOpen className="size-5" />
              </div>

              <span className="text-xs font-bold text-slate-400">
                04
              </span>
            </div>

            <p className="mt-6 text-xl font-black text-slate-950">
              {program.semesterType.replace("_", " ")}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Semester System
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ================= LEFT ================= */}
          <div className="space-y-8">
            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <BookOpen className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    Program Overview
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    About the Program
                  </h2>
                </div>
              </div>

              <p className="mt-7 text-sm leading-8 text-slate-600">
                {program.description}
              </p>
            </section>

            {/* Department */}
            <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-7 text-white sm:p-9">
              <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
                      Academic Department
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      {program.department.name}
                    </h2>
                  </div>

                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-orange-300">
                    {program.department.code}
                  </span>
                </div>

                <div className="my-7 h-px bg-white/10" />

                <p className="max-w-3xl text-sm leading-8 text-slate-300">
                  {program.department.description}
                </p>
              </div>
            </section>

            {/* Academic Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Academic Structure
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  Program Details
                </h2>
              </div>

              <div className="mt-7 divide-y divide-slate-100">
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Degree Type
                  </span>

                  <span className="font-bold text-slate-900">
                    {program.degreeType}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Program Duration
                  </span>

                  <span className="font-bold text-slate-900">
                    {program.duration} Years
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Total Credits
                  </span>

                  <span className="font-bold text-slate-900">
                    {program.totalCredits}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Total Semesters
                  </span>

                  <span className="font-bold text-slate-900">
                    {program.semester}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Semester Type
                  </span>

                  <span className="font-bold text-slate-900">
                    {program.semesterType.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-slate-500">
                    Program Status
                  </span>

                  <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <CheckCircle2 className="size-4" />
                    Active
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ================= RIGHT ================= */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
              {/* Fee Header */}
              <div className="relative overflow-hidden bg-orange-500 p-7 text-white">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-white/10" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
                      <Wallet className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-100">
                        Financial Information
                      </p>

                      <h2 className="mt-1 text-xl font-black">
                        Program Fees
                      </h2>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-medium text-orange-100">
                      Estimated Total Program Fee
                    </p>

                    <p className="mt-1 text-4xl font-black">
                      ৳{program.totalFee.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="p-7">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Admission Fee
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        One-time
                      </p>
                    </div>

                    <p className="font-bold text-slate-900">
                      ৳{program.admissionFee.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Tuition Fee
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Program tuition
                      </p>
                    </div>

                    <p className="font-bold text-slate-900">
                      ৳{program.tuitionFee.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Per Credit
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Credit cost
                      </p>
                    </div>

                    <p className="font-bold text-slate-900">
                      ৳{program.perCreditFee.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="my-6 h-px bg-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Total Fee
                  </span>

                  <span className="text-2xl font-black text-orange-600">
                    ৳{program.totalFee.toLocaleString()}
                  </span>
                </div>

              

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Admission requirements and application availability
                  may vary by academic session.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Page;