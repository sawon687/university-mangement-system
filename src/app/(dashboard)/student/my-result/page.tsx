"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  IdCard,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

// Static Data
const studentData = {
  name: "Md Al Jihad Sawon",
  studentId: "CSE-2021-042",
  department: "Department of Computer Science & Engineering (CSE)",
  address: "Mirpur, Dhaka, Bangladesh",
  cgpa: "3.85", // Static Header CGPA
  totalCreditsCompleted: 68.5,
  academicStatus: "Regular / Good Standing",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  
  // 8 Semesters Static Data
  semesters: {
    "1st Semester": [
      { code: "CSE-1101", name: "Introduction to Computer Systems", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "ENG-1101", name: "Foundation English", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "MAT-1101", name: "Differential & Integral Calculus", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "PHY-1101", name: "Physics-I (Mechanics & Waves)", credit: 3.0, grade: "A-", gpa: 3.50 },
    ],
    "2nd Semester": [
      { code: "CSE-1201", name: "Structured Programming Language", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "CSE-1202", name: "Structured Programming Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "MAT-1201", name: "Coordinate Geometry & Vector Analysis", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "EEE-1201", name: "Basic Electrical Engineering", credit: 3.0, grade: "B+", gpa: 3.25 },
    ],
    "3rd Semester": [
      { code: "CSE-2101", name: "Data Structures & Algorithms", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "CSE-2102", name: "Data Structures Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "MAT-2101", name: "Discrete Mathematics", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "STA-2101", name: "Statistics and Probability", credit: 3.0, grade: "A-", gpa: 3.50 },
    ],
    "4th Semester": [
      { code: "CSE-2201", name: "Object Oriented Programming", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "CSE-2202", name: "OOP Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "CSE-2203", name: "Database Management Systems", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "CSE-2204", name: "DBMS Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
    ],
    "5th Semester": [
      { code: "CSE-3101", name: "Operating Systems", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "CSE-3102", name: "Operating Systems Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "CSE-3103", name: "Software Engineering", credit: 3.0, grade: "A+", gpa: 4.0 },
    ],
    "6th Semester": [
      { code: "CSE-3201", name: "Computer Networks", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "CSE-3202", name: "Computer Networks Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "CSE-3203", name: "Web Engineering", credit: 3.0, grade: "A+", gpa: 4.0 },
    ],
    "7th Semester": [
      { code: "CSE-4101", name: "Artificial Intelligence", credit: 3.0, grade: "A", gpa: 3.75 },
      { code: "CSE-4102", name: "AI Lab", credit: 1.5, grade: "A+", gpa: 4.0 },
      { code: "CSE-4100", name: "Project / Thesis Phase I", credit: 2.0, grade: "A+", gpa: 4.0 },
    ],
    "8th Semester": [
      { code: "CSE-4201", name: "Machine Learning", credit: 3.0, grade: "A+", gpa: 4.0 },
      { code: "CSE-4200", name: "Project / Thesis Phase II", credit: 4.0, grade: "A+", gpa: 4.0 },
    ],
  },
};

export default function StudentResultPortal() {
  const [selectedSemester, setSelectedSemester] = useState<keyof typeof studentData.semesters>("1st Semester");
  const semesterKeys = Object.keys(studentData.semesters) as Array<keyof typeof studentData.semesters>;

  const currentSubjects = studentData.semesters[selectedSemester] || [];

  // Calculate SGPA for selected semester
  const totalCredits = currentSubjects.reduce((acc, sub) => acc + sub.credit, 0);
  const weightedPoints = currentSubjects.reduce((acc, sub) => acc + sub.gpa * sub.credit, 0);
  const sgpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-slate-100/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Profile + Static CGPA Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 transition-all">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
            
            {/* Student Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative">
                <img
                  src={studentData.avatar}
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
                  {studentData.department}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                  {studentData.name}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <IdCard className="w-4 h-4 text-slate-400" />
                    ID: {studentData.studentId}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {studentData.address}
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
                  {studentData.cgpa} <span className="text-xs text-indigo-300 font-normal">/ 4.00</span>
                </p>
              </div>

              <div className="border-t border-slate-700/60 pt-2 w-full text-right lg:text-center">
                <p className="text-xs text-slate-300">
                  Total Completed: <span className="font-semibold text-white">{studentData.totalCreditsCompleted} Credits</span>
                </p>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {studentData.academicStatus}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Semester Selection & Results Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          
          {/* Section Header with Select Dropdown & Responsive Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" /> Academic Results
              </h2>
              <p className="text-xs text-slate-500">Select a semester to view individual course grades.</p>
            </div>

            {/* Dropdown menu for mobile or quick select when tabs are many */}
            <div className="relative w-full sm:w-56">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value as keyof typeof studentData.semesters)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl py-2.5 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {semesterKeys.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Horizontal Scrollable Tabs Solution (Handles 8+ Semesters smoothly) */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth">
              {semesterKeys.map((sem) => {
                const isActive = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    onClick={() => setSelectedSemester(sem)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {sem}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course Grade Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-5">Course Code</th>
                  <th className="py-3.5 px-5">Course Title</th>
                  <th className="py-3.5 px-5 text-center">Credit</th>
                  <th className="py-3.5 px-5 text-center">Grade</th>
                  <th className="py-3.5 px-5 text-center">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentSubjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-indigo-600">{sub.code}</td>
                    <td className="py-4 px-5 font-medium text-slate-800">{sub.name}</td>
                    <td className="py-4 px-5 text-center font-medium text-slate-600">{sub.credit.toFixed(1)}</td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800">
                        {sub.grade}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center font-semibold text-slate-700">{sub.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer SGPA Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              Selected: <strong className="text-slate-800">{selectedSemester}</strong> ({currentSubjects.length} Courses)
            </span>
            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border border-indigo-100 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Semester SGPA:</span>
              <span className="text-xl font-extrabold text-indigo-600">{sgpa}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

