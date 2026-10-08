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
        className="group flex h-full flex-col relative overflow-hidden bg-white shadow-xl shadow-slate-200/60 rounded-xl hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-2 transition-all duration-300 ring-1 ring-slate-100"
      >
        <CardHeader
          className={`p-6 ${headerClass} relative -top-5 overflow-hidden border-0`}
        >
          <div className="absolute -right-12 -bottom-12 size-36 rounded-full bg-white/10 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

          <div className="flex items-start justify-between relative z-10">
            <Badge
              variant="secondary"
              className="border-0 bg-white/20 backdrop-blur-md text-white px-3.5 py-1 text-xs font-semibold rounded-full shadow-inner"
            >
              {program.degreeType}
            </Badge>

            <Badge
              variant="secondary"
              className={`border-0 backdrop-blur-md px-3.5 py-1 text-xs font-semibold rounded-full shadow-inner ${
                program.isActive
                  ? "bg-emerald-500/30 text-white"
                  : "bg-rose-500/30 text-white"
              }`}
            >
              {program.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="pt-4 relative z-10">
            <h3 className="text-xl font-extrabold tracking-tight leading-snug group-hover:text-orange-100 transition-colors">
              {program.name}
            </h3>

            <p className="mt-1.5 text-sm text-white/85 font-medium">
              {program.department.name}
            </p>

            <div className="mt-5 flex items-center justify-between text-xs font-semibold text-white/95 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-inner">
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

        <CardContent className="flex flex-1 flex-col text-sm bg-slate-50">
  
          <div className="mt-6 space-y-3 text-xs bg-white p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Total Credits</span>
              <span className="font-bold text-slate-800">
                {program.totalCredits}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Semester Type</span>
              <span className="font-bold text-slate-800">
                {program.semesterType}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Admission Fee</span>
              <span className="font-bold text-slate-800">
                ৳{program.admissionFee.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Tuition Fee</span>
              <span className="font-bold text-slate-800">
                ৳{program.tuitionFee.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Per Credit Fee</span>
              <span className="font-bold text-slate-800">
                ৳{program.perCreditFee.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200/80 pt-3">
              <span className="font-semibold text-slate-600">Total Fee</span>
              <span className="text-base font-black text-orange-600">
                ৳{program.totalFee.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-2 gap-3 p-6 bg-white">
         
             <AdmissionApply programId={program.id} />
           
          <Button render={<Link href={`/programs/${program.id}`}/>} variant="outline" className="py-5 shadow-2xl">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgramCard;
