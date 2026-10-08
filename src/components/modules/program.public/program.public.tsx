"use client";
import { Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InitialPrograms,
  IProgram,
  ProgramMetaData,
} from "../../../type/program.type";
import ProgramCard from "./programCard";
import { useEffect, useState } from "react";
import { useGetDepartment } from "../../../hooks/department.hook";
import { IDepartment } from "../../../type";
import { inputClass } from "../../../utils/input-class";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "../../../hooks/params.hook";
import { useDebaunce } from '../../../hooks/debaunce.hook';

const bgHeaderColor = {
  // CSE
  CSE_BSC:
    "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white",

  CSE_MSC:
    "bg-gradient-to-br from-violet-600 via-fuchsia-700 to-pink-800 text-white",

  CSE_DIPLOMA:
    "bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-700 text-white",

  // EEE
  EEE_BSC:
    "bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white",

  EEE_MSC: "bg-gradient-to-br from-pink-600 via-rose-600 to-red-800 text-white",

  // BBA
  BBA_BBA:
    "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white",

  BBA_MBA:
    "bg-gradient-to-br from-slate-700 via-zinc-800 to-slate-900 text-white",

  // English
  ENG_BA:
    "bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 text-white",
} as const;

interface props {
  data: InitialPrograms;
}
const ProgramPublic = ({ data }: props) => {
  const programs = data?.programs || [];
  const params = useSearchParams();
  const reuslt = useGetDepartment("");
  const departments = reuslt?.data?.data || [];
  console.log("departments", departments);
  const [department, setDepartment] = useState("All Department");
  const [studyFormat, setStudyFormat] = useState("All Study");
  const [degree, setDegreee] = useState("All Degree");
  const [search, setSearch] = useState("");
  const searchTram=useDebaunce(search)
  const router = useRouter();
  console.log("first", data);

  useEffect(() => {
    const searchParams = new URLSearchParams(params);
    const departmentvalue = searchParams.get("department") || "CSE";
    const degreeTypevalue = searchParams.get("degree") || "BSC";
    const studyvalue = searchParams.get("study") || "TRI_SEMESTER";

    if (searchParams) {
      if (departmentvalue && department !== departmentvalue) {
        searchParams.set("department", department);
      }
      if (degreeTypevalue && degree !== degreeTypevalue) {
        searchParams.set("degree", degree);
      }
      if (studyvalue && studyFormat !== studyvalue) {
        searchParams.set("study", studyFormat);
      }
      if(searchParams)
      {
         searchParams.set('search',searchTram)
      }
      router.push(`/programs?${searchParams.toString()}`, { scroll: false });
    }
  }, [department, studyFormat, degree,searchTram]);

  return (
    <div>
      {/* Programs Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
      
                placeholder="Search by program, department, or degree..."
                className="h-12 rounded-xl border-slate-200
                 bg-slate-50 pl-11 pr-4 text-sm text-slate-900
                  placeholder:text-slate-400 focus-visible:border-primary
                  focus-visible:ring-1 focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
             
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-2.5 sm:flex-row">
              {/* Degree */}
              <Select
                value={degree}
                onValueChange={(value) => setDegreee(value ?? "")}
              >
                <SelectTrigger className={`${inputClass} w-[160px]`}>
                  <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent>
                  {["BSC", "MSC", "BA", "BBA", "MBA"].map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Department */}
              <Select
                value={department}
                onValueChange={(value) =>
                  setDepartment(value ?? "All Department")
                }
              >
                <SelectTrigger className={`${inputClass} w-[160px]`}>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Department">All Departments</SelectItem>
                  {departments?.map((dep: IDepartment) => (
                    <SelectItem key={dep.id} value={String(dep.code)}>
                      {dep.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Study Format */}
              <Select
                value={studyFormat}
                onValueChange={(value) => setStudyFormat(value ?? "")}
              >
                <SelectTrigger className={`${inputClass} w-[160px]`}>
                  <SelectValue placeholder="Select System" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: "TRI_SEMESTER", label: "Trimester (3 terms)" },
                    { value: "BI_SEMESTER", label: "Semester (2 terms)" },
                  ].map((sem) => (
                    <SelectItem value={sem.value}>{sem.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Result Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Academic Programs
              </h2>

              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                {data?.meta?.total || 0}
              </span>
            </div>

            <p className="mt-1.5 text-sm text-slate-500">
              Explore our programs and find the right path for your academic
              goals.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-10 w-fit gap-2 rounded-xl border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
          >
            <Filter className="size-4" />
            More Filters
          </Button>
        </div>
        {/* Program Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program: IProgram) => {
            const headerKey =
              `${program.department?.code ?? ""}_${program.degreeType ?? ""}` as keyof typeof bgHeaderColor;
            const headerClass =
              bgHeaderColor[headerKey] ?? "bg-slate-800 text-white";

            return (
              <ProgramCard
                key={program.id}
                program={program}
                headerClass={headerClass}
              />
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="mt-14 flex justify-center gap-3">
          <span className="size-3.5 rounded-full bg-orange-600 shadow-md shadow-orange-600/50 scale-110 cursor-pointer" />
          <span className="size-3.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors cursor-pointer" />
          <span className="size-3.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors cursor-pointer" />
        </div>
      </section>
    </div>
  );
};

export default ProgramPublic;
