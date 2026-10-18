import React from "react";
import { useGetMe } from "../../../hooks/auth.hook";
import {
  Award,
  CheckCircle2,
  GraduationCap,
  IdCard,
  MapPin,
} from "lucide-react";
import { IUser } from "../../../type";
import { useMycgpa } from "../../../hooks/mycgpa.hook";
const avatar =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

interface StudentCgpa {
  studentId: string;
  cgpa: number;
  totalCredits: number;
  totalPoints: number;
}
const StudentCgpaResultheader = () => {
  const { data } = useGetMe();
  const { data: result,isError } = useMycgpa();
  const studentCgpa = result?.data as StudentCgpa;
 
  const studentData: IUser = data?.data;
  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 transition-all">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          {/* Student Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={
                  studentData.studentProfile?.profilePhoto
                    ? studentData.studentProfile?.profilePhoto
                    : avatar
                }
                alt="Student Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-full ring-2 ring-white">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                {studentData.studentProfile?.department?.name}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {studentData.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <IdCard className="w-4 h-4 text-slate-400" />
                  ID: {studentData.id}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {studentData.studentProfile?.address}
                </span>
              </div>
            </div>
          </div>

          {/* Static CGPA & Overall Summary Badge */}
          <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-lg shadow-indigo-900/10 min-w-[220px]">
            <div className="text-left lg:text-center">
              <p className="text-xs font-medium text-indigo-200 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Overall CGPA
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-white mt-0.5">
                {studentCgpa?.cgpa}{" "}
                <span className="text-xs text-indigo-300 font-normal">
                  / 4.00
                </span>
              </p>
            </div>

            <div className="border-t border-slate-700/60 pt-2 w-full text-right lg:text-center">
              <p className="text-xs text-slate-300">
                Total Completed:{" "}
                <span className="font-semibold text-white">
                  {studentCgpa?.totalCredits} Credits
                </span>
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">
                {studentData?.userStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCgpaResultheader;
