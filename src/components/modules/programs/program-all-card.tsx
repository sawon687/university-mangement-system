"use client";
import { BookOpen, MoreHorizontal } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import Stat from "./program-stat";
import { IProgram } from "../../../type/program.type";
import { IDepartment } from "../../../type";
import { useGetProgram } from "../../../hooks/program.hook";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import ProgramsTabs from "./pragrams-tabs";
import ProgramListSkeleton from "./program.loading";
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-BD").format(value);
export default function ProgramList() {
  const { data, isLoading } = useGetProgram();
  const programs = data?.data.programs;
  console.log("program", programs);
  return (
    <div>
      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* <OverviewCard
          title="Total Programs"
          value={programs.length}
          icon={<BookOpen className="size-5" />}
          description="All academic programs"
        />

        <OverviewCard
          title="Active Programs"
          value={activePrograms.length}
          icon={<GraduationCap className="size-5" />}
          description="Currently available"
        />

        <OverviewCard
          title="Inactive Programs"
          value={inactivePrograms.length}
          icon={<CalendarDays className="size-5" />}
          description="Currently unavailable"
        />

        <OverviewCard
          title="Total Credits"
          value={programs.reduce(
            (total, program) => total + program.totalCredits,
            0,
          )}
          icon={<Wallet className="size-5" />}
          description="Across all programs"
        /> */}
      </div>

      {/* Programs */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Academic Programs</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage university programs.
              </p>
            </div>
          </div>
        </CardHeader>
        <ProgramsTabs />
      </Card>
      <div className="divide-y">
        {isLoading ? (
          <>
            <ProgramListSkeleton />
          </>
        ) : (
          <>
            {programs?.map((program: IProgram) => {
              const department: IDepartment = program.department;

              return (
                <div
                  key={program.id}
                  className="p-5 transition-colors hover:bg-muted/40"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    {/* Program info */}
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                        <BookOpen className="size-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{program.name}</h3>

                          <Badge
                            variant={program.isActive ? "default" : "secondary"}
                          >
                            {program.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span>{program.degreeType}</span>

                          <span>•</span>

                          <span>{department.name}</span>
                        </div>

                        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                          {program.description}
                        </p>
                      </div>
                    </div>

                    {/* Program stats */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 lg:w-[430px] lg:shrink-0">
                      <Stat
                        label="Duration"
                        value={`${program.duration} Years`}
                      />

                      <Stat label="Credits" value={program.totalCredits} />

                      <Stat label="Semester" value={program.semester} />

                      <Stat
                        label="Total Fee"
                        value={`৳${formatCurrency(program.totalFee)}`}
                      />
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                          >
                            {" "}
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Program actions</span>
                          </Button>
                        }
                      ></DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Program</DropdownMenuItem>

                        <DropdownMenuItem>Edit Program</DropdownMenuItem>

                        <DropdownMenuItem>
                          {program.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
