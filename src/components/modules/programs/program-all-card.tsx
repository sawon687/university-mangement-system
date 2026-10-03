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
import { IDepartment } from '../../../type';
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-BD").format(value);
export default function ProgramList({ programs }: { programs: IProgram[] }) {
    console.log('program',programs)
  return (
    <div className="divide-y">
      {programs.map((program) => { 
         const department: IDepartment =program.department
         
        return(
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
                    variant={program.isActive? "default" : "secondary"}
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
              <Stat label="Duration" value={`${program.duration} Years`} />

              <Stat label="Credits" value={program.totalCredits} />

              <Stat label="Semester" value={program.semester} />

              <Stat
                label="Total Fee"
                value={`৳${formatCurrency(program.totalFee)}`}
              />
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Program actions</span>
                </Button>
              </DropdownMenuTrigger>

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
      )})}
    </div>
  );
}
