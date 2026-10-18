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
import StudentCgpaResultheader from '../../../../components/modules/student/result-header';
import StudentSemesterResult from '../../../../components/modules/student/student-semester-Result';

  

export default function StudentResultPortal() {


  return (
    <div className="min-h-screen bg-slate-100/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Profile + Static CGPA Summary Card */}
    <StudentCgpaResultheader/>

      <StudentSemesterResult/>

      </div>
    </div>
  );
}

