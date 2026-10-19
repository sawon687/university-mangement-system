import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProgram } from '../../../type/program.type';
import { ArrowRight, Clock3, GraduationCap } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import AdmissionApply from '../../modal/admision-apply.modal';
const ProgramCard = ({program,headerClass}:{program:IProgram,headerClass:string}) => {
  return (
 <div>
  <Card
    key={program.id}
    className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xl shadow-slate-200/60 ring-1 ring-border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/15 dark:shadow-black/20"
  >
    {/* Card Header */}
    <CardHeader
      className={`relative -top-5 overflow-hidden border-0 p-6 ${headerClass}`}
    >
      <div className="pointer-events-none absolute -right-12 -bottom-12 size-36 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

      <div className="relative z-10 flex items-start justify-between">
        <Badge
          variant="secondary"
          className="rounded-full border-0 bg-white/20 px-3.5 py-1 text-xs font-semibold text-white shadow-inner backdrop-blur-md"
        >
          {program.degreeType}
        </Badge>

        <Badge
          variant="secondary"
          className={`rounded-full border-0 px-3.5 py-1 text-xs font-semibold shadow-inner backdrop-blur-md ${
            program.isActive
              ? "bg-emerald-500/30 text-white"
              : "bg-rose-500/30 text-white"
          }`}
        >
          {program.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="relative z-10 pt-4">
        <h3 className="text-xl leading-snug font-extrabold tracking-tight text-white transition-colors group-hover:text-orange-100">
          {program.name}
        </h3>

        <p className="mt-1.5 text-sm font-medium text-white/85">
          {program.department.name}
        </p>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white/95 shadow-inner backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-4 text-orange-200" />
            Semester {program.semester}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 className="size-4 text-orange-200" />
            {program.duration} Years
          </span>
        </div>
      </div>
    </CardHeader>

    {/* Card Content */}
    <CardContent className="-mt-5 flex flex-1 flex-col bg-muted/30 text-sm transition-colors duration-300">
      <div className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-4 text-xs shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">
            Total Credits
          </span>
          <span className="font-bold text-foreground">
            {program.totalCredits}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">
            Semester Type
          </span>
          <span className="font-bold text-foreground">
            {program.semesterType}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">
            Admission Fee
          </span>
          <span className="font-bold text-foreground">
            ৳{program.admissionFee.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">
            Tuition Fee
          </span>
          <span className="font-bold text-foreground">
            ৳{program.tuitionFee.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">
            Per Credit Fee
          </span>
          <span className="font-bold text-foreground">
            ৳{program.perCreditFee.toLocaleString()}
          </span>
        </div>

        {/* Total Fee */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="font-semibold text-muted-foreground">
            Total Fee
          </span>
          <span className="text-base font-black text-orange-600 dark:text-orange-400">
            ৳{program.totalFee.toLocaleString()}
          </span>
        </div>
      </div>
    </CardContent>

    {/* Card Footer */}
    <CardFooter className="grid grid-cols-2 gap-3 border-t border-border bg-card p-6 transition-colors duration-300">
      <AdmissionApply programId={program.id} />

      <Button
        render={<Link href={`/programs/${program.id}`} />}
        variant="outline"
        className="rounded-xl border-border bg-background py-5 text-foreground shadow-sm transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400"
      >
        Learn More
      </Button>
    </CardFooter>
  </Card>
</div>
  );
};

export default ProgramCard;
