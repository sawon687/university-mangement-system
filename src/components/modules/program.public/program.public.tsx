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
import { InitialPrograms, IProgram } from "../../../type/program.type";
import ProgramCard from "./programCard";
import { useEffect, useState } from "react";
import { useGetDepartment } from "../../../hooks/department.hook";
import { IDepartment } from "../../../type";
import { inputClass } from "../../../utils/input-class";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "../../../hooks/params.hook";
import { useDebaunce } from "../../../hooks/debaunce.hook";
import UsePagination from "../../../hooks/usepagenation.hook";

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
  const [department, setDepartment] = useState("All");
  const [studyFormat, setStudyFormat] = useState("All");
  const [degree, setDegree] = useState("All");
  const [search, setSearch] = useState("");
  const meta = data?.meta;
  const [page, setPage] = useState(1);
  const searchTram = useDebaunce(search);
  const router = useRouter();

  console.log("first", data);

  useEffect(() => {
    const searchParams = new URLSearchParams(params);
    const departmentvalue = searchParams.get("department") || "All";
    const degreeTypevalue = searchParams.get("degree") || "All";
    const studyvalue = searchParams.get("study") || "All";

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
      if (searchParams) {
        searchParams.set("search", searchTram);
      }
      if (page) {
        searchParams.set("page", String(page));
      }
      router.push(`/programs?${searchParams.toString()}`, { scroll: false });
    }
  }, [department, studyFormat, degree, searchTram, page]);

  return (
    <div>
      {/* Programs Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative min-w-0 mt-5 flex-1">
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

       
              {/* Degree */}

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Degree */}
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-xs font-semibold text-slate-600">
                    Degree Type
                  </label>

                  <Select
                    value={degree}
                    onValueChange={(value) => setDegree(value ?? "All")}
                  >
                    <SelectTrigger
                      className={`${inputClass} w-full sm:w-[160px]`}
                    >
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="All">All Degrees</SelectItem>
                      {["BSC", "MSC", "BA", "BBA", "MBA"].map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-xs font-semibold text-slate-600">
                    Department
                  </label>

                  <Select
                    value={department}
                    onValueChange={(value) => setDepartment(value ?? "All")}
                  >
                    <SelectTrigger
                      className={`${inputClass} w-full sm:w-[160px]`}
                    >
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      {departments?.map((dep: IDepartment) => (
                        <SelectItem key={dep.id} value={String(dep.code)}>
                          {dep.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Study Format */}
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-xs font-semibold text-slate-600">
                    Study Format
                  </label>

                  <Select
                    value={studyFormat}
                    onValueChange={(value) => setStudyFormat(value ?? "All")}
                  >
                    <SelectTrigger
                      className={`${inputClass} w-full sm:w-[160px]`}
                    >
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="All">All Formats</SelectItem>
                      {[
                        { value: "TRI_SEMESTER", label: "Trimester (3 terms)" },
                        { value: "BI_SEMESTER", label: "Semester (2 terms)" },
                      ].map((sem) => (
                        <SelectItem key={sem.value} value={sem.value}>
                          {sem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

        {/* Program Grid */}
        {programs.length > 0 ? (
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
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-orange-100">
              <Search className="size-7 text-orange-500" />
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
              No Programs Found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {search.trim()
                ? `We couldn't find any programs matching "${search}". Try a different search keyword or change your filters.`
                : "No academic programs match your selected filters. Try changing your department, degree, or study format."}
            </p>

            <Button
              variant="outline"
              className="mt-5 rounded-xl border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
              onClick={() => {
                setSearch("");
                setDegree("All");
                setDepartment("All");
                setStudyFormat("All");
                setPage(1);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination Dots */}
        {meta && (
          <UsePagination
            onPageChange={setPage}
            totalPages={meta.totalPage}
            currentPage={meta.currentPage}
          />
        )}
      </section>
    </div>
  );
};

export default ProgramPublic;
