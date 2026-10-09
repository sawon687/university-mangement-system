'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  GraduationCap,
  Building2,
  Hash,
  Venus,
  ShieldCheck,
  Pencil,
  Clock,
  Camera,
} from "lucide-react";

import { Input } from "../../ui/input";
import { FieldError, FieldLabel } from "../../ui/field";
import { getMe } from '../../../api';
import { useGetMe } from '../../../hooks/auth.hook';
import { IDepartment, IStudentProfile, IUser } from '../../../type';
import StudentProfileEditModal from '../../modal/studentProfile-Edit.modal';

const StudentProfile = () => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const {data}=useGetMe()
  const student:IUser=data?.data??''
console.log('studnet',student)
  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    if (imageFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(imageFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    setPreview(null);
  }, [imageFile]);

  const handleImageChange = (file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      setError("Please upload valid JPG or PNG images.");
      return;
    }

    setError("");
    setImageFile(file);
  };

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-36 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 sm:h-44">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[30px] border-white/10" />
          <div className="absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-6 top-6 flex items-center gap-2 text-white/90">
            <GraduationCap size={23} />
            <span className="text-sm font-semibold tracking-wide">
              UniSphere Student
            </span>
          </div>
        </div>

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-orange-50 shadow-md sm:h-28 sm:w-28">
                <Image
                  src={preview ?preview: student?.studentProfile?.profilePhoto? student.studentProfile.profilePhoto:'https://api.dicebear.com/9.x/avataaars/png?seed=Sawon'}
                  alt={student.name??''}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                <div className="absolute left-21 top-21 -translate-x-1/2 -translate-y-1/2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-picture"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        return;
                      }

                      handleImageChange(file);
                      e.target.value = "";
                    }}
                  />

                  <FieldLabel
                    htmlFor="profile-picture"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-md transition hover:scale-105"
                  >
                    <Camera size={18} />
                  </FieldLabel>
                  <FieldError errors={error ? [{ message: error }] : []} />
                </div>
              </div>

                  <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {student.name}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {student.email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <ShieldCheck size={14} />
                    {student.userStatus}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    <GraduationCap size={14} />
                    {student.role}
                  </span>

                  {student.emailVerified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      <ShieldCheck size={14} />
                      Email Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
           <StudentProfileEditModal editData={student?.studentProfile}/>
          </div>
        </div>
      </div>

       {/* Student Overview */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <UserRound size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Personal Information
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Your personal contact details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            <InfoItem
              icon={<UserRound size={18} />}
              label="Full Name"
              value={student.name}
            />

            <InfoItem
              icon={<Mail size={18} />}
              label="Email Address"
              value={student.email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Phone Number"
              value={student?.studentProfile?.phone??''}
            />

            <InfoItem
              icon={<Venus size={18} />}
              label="Gender"
              value={student?.studentProfile?.gender??''}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Date of Birth"
              value={student.studentProfile?.dateOfBirth??''}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              label="Address"
              value={student.studentProfile?.address??''}
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <GraduationCap size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Academic Information
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Your university details
              </p>
            </div>
          </div>

          <div className="space-y-5 pt-5">
            <AcademicItem
              icon={<Hash size={18} />}
              label="Profile ID"
              value={student.studentProfile?.id ??''}
            />

            <AcademicItem
              icon={<Building2 size={18} />}
              label="Department Code"
              value={student?.studentProfile?.department?.code ??''}
            />

            <AcademicItem
              icon={<GraduationCap size={18} />}
              label="Department Name"
              value={student.studentProfile?.department?.name ??''}
            />

            <AcademicItem
              icon={<Clock size={18} />}
              label="Member Since"
              value={
                student?.studentProfile?.department?.createdAt
                  ? new Date(
                      student?.studentProfile?.department?.createdAt
                    ).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Not available"
              }
            />
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Your student account is{" "}
              {student.userStatus === "ACTIVE" ? "active" : "inactive"}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Keep your contact information up to date to receive important
              university notifications.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-semibold text-orange-700">
          {student.emailVerified ? "Account verified" : "Email not verified"}
        </span>
      </div>
    </div>
  );
};
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 border-b border-slate-100 py-5 last:border-b-0">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function AcademicItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-800">
          {value || "Not assigned"}
        </p>
      </div>
    </div>
  );
}
export default StudentProfile;
