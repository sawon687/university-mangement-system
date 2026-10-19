"use client";

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
  BriefcaseBusiness,
  BookOpen,
  Award,
  Clock,
  BadgeCheck,
  ContactRound,
  FileText,
  Camera,
  LoaderCircle,
} from "lucide-react";

import { IDepartment, IUser } from "../../../type";
import { useGetMe } from "../../../hooks/auth.hook";
import { Input } from "../../ui/input";
import { FieldError, FieldLabel } from "../../ui/field";
import InstructorProfileEditModal from "../../modal/InstructorProfileEditModal";

const FALLBACK_IMAGE =
  "https://api.dicebear.com/9.x/avataaars/png?seed=Instructor";

const formatDate = (value?: string | Date | null) => {
  if (!value) return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not provided";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatMonthYear = (value?: string | Date | null) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

export default function InstructorProfilePage() {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useGetMe();

  const instructor = data?.data as IUser | undefined;

console.log('departmentId',instructor?.instructorProfile?.department)

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageChange = (file?: File) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg"];

    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid JPG or PNG image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setImageFile(file);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="animate-spin text-orange-500" size={22} />
          Loading instructor profile...
        </div>
      </div>
    );
  }

  if (isError || !instructor) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <ShieldCheck className="mx-auto mb-3 text-red-500" size={32} />
        <h2 className="font-semibold text-slate-900">Unable to load profile</h2>
        <p className="mt-2 text-sm text-slate-600">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  const profileImage = preview || instructor.instructorProfile?.profilePhoto || FALLBACK_IMAGE;

  return (
  <div className="min-w-0 space-y-6 pb-8 text-foreground">
{/* Profile Banner */}
<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors duration-300">
<div className="relative h-36 overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 sm:h-44">
<div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[30px] border-white/10" />
<div className="absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
<div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-xl" />

      <div className="absolute left-5 top-5 flex items-center gap-2 text-white sm:left-8 sm:top-7">
        <GraduationCap size={25} />
        <div>
          <p className="text-sm font-bold tracking-wide">
            UniSphere Faculty
          </p>
          <p className="text-xs text-white/80">
            Instructor Profile
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:flex">
        <ShieldCheck size={15} />
        Faculty Member
      </div>
    </div>

    <div className="px-5 pb-6 sm:px-8">
      <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-muted shadow-md sm:h-28 sm:w-28">
            <Image
              src={profileImage}
              alt={instructor.name || "Instructor"}
              fill
              sizes="112px"
              unoptimized={profileImage.startsWith("blob:")}
              className="object-cover"
            />

            <div className="absolute bottom-1 right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-md">
              <Input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                id="instructor-profile-picture"
                onChange={(event) => {
                  handleImageChange(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              <FieldLabel
                htmlFor="instructor-profile-picture"
                className="flex h-full w-full cursor-pointer items-center justify-center"
              >
                <Camera size={15} />
              </FieldLabel>
            </div>
          </div>

          <div className="min-w-0 pb-1">
            <h1 className="break-words text-xl font-bold text-foreground sm:text-2xl">
              {instructor.name || "Instructor"}
            </h1>

            <p className="mt-1 break-all text-sm text-muted-foreground">
              {instructor.email}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck size={14} />
                {instructor.userStatus || "UNKNOWN"}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400">
                <GraduationCap size={14} />
                {instructor.role || "INSTRUCTOR"}
              </span>

              {instructor.emailVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  <BadgeCheck size={14} />
                  Email Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {instructor.instructorProfile && (
          <InstructorProfileEditModal
            editData={instructor.instructorProfile}
          />
        )}
      </div>

      {error && (
        <div className="mt-3">
          <FieldError errors={[{ message: error }]} />
        </div>
      )}
    </div>
  </section>

  {/* Professional Summary */}
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <SummaryCard
      icon={<BriefcaseBusiness size={21} />}
      label="Designation"
      value={instructor.instructorProfile?.designation ?? ""}
      color="orange"
    />

    <SummaryCard
      icon={<Building2 size={21} />}
      label="Department"
      value={instructor.instructorProfile?.department?.name ?? ""}
      color="blue"
    />

    <SummaryCard
      icon={<Clock size={21} />}
      label="Teaching Experience"
      value={instructor.instructorProfile?.experience}
      color="emerald"
    />
  </section>

  {/* Personal and Faculty Information */}
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300 sm:p-6 lg:col-span-2">
      <SectionHeader
        icon={<UserRound size={20} />}
        title="Personal Information"
        description="Your personal contact details"
        color="orange"
      />

      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <InfoItem
          icon={<UserRound size={18} />}
          label="Full Name"
          value={instructor.name}
        />

        <InfoItem
          icon={<Mail size={18} />}
          label="Email Address"
          value={instructor.email}
        />

        <InfoItem
          icon={<Phone size={18} />}
          label="Phone Number"
          value={instructor.instructorProfile?.phone}
        />

        <InfoItem
          icon={<Venus size={18} />}
          label="Gender"
          value={instructor.instructorProfile?.gender ?? ""}
        />

        <InfoItem
          icon={<CalendarDays size={18} />}
          label="Date of Birth"
          value={formatDate(
            instructor.instructorProfile?.dateOfBirth,
          )}
        />

        <InfoItem
          icon={<MapPin size={18} />}
          label="Address"
          value={instructor.instructorProfile?.address ?? ""}
        />
      </div>
    </section>

    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300 sm:p-6">
      <SectionHeader
        icon={<GraduationCap size={20} />}
        title="Faculty Information"
        description="Your university details"
        color="blue"
      />

      <div className="space-y-5 pt-5">
        <AcademicItem
          icon={<Hash size={18} />}
          label="Teacher Code"
          value={instructor.instructorProfile?.teacherCode ?? ""}
        />

        <AcademicItem
          icon={<ContactRound size={18} />}
          label="Profile ID"
          value={instructor.instructorProfile?.id ?? ""}
        />

        <AcademicItem
          icon={<Building2 size={18} />}
          label="Department Code"
          value={instructor.instructorProfile?.department?.code ?? ""}
        />

        <AcademicItem
          icon={<BookOpen size={18} />}
          label="Department Name"
          value={instructor.instructorProfile?.department?.name}
        />

        <AcademicItem
          icon={<Clock size={18} />}
          label="Member Since"
          value={formatMonthYear(instructor.createdAt)}
        />
      </div>
    </section>
  </div>

  {/* Professional Information */}
  <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300 sm:p-6">
    <SectionHeader
      icon={<Award size={20} />}
      title="Professional Information"
      description="Your academic background and expertise"
      color="purple"
    />

    <div className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2">
      <ProfessionalItem
        icon={<GraduationCap size={19} />}
        label="Highest Qualification"
        value={instructor.instructorProfile?.qualification}
      />

      <ProfessionalItem
        icon={<BookOpen size={19} />}
        label="Area of Specialization"
        value={instructor.instructorProfile?.specialization}
      />

      <ProfessionalItem
        icon={<BriefcaseBusiness size={19} />}
        label="Designation"
        value={instructor.instructorProfile?.designation}
      />

      <ProfessionalItem
        icon={<FileText size={19} />}
        label="Experience"
        value={instructor.instructorProfile?.experience}
      />
    </div>

    <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 text-foreground">
        <FileText size={18} />
        <h3 className="text-sm font-bold">Professional Bio</h3>
      </div>

      <p className="text-sm leading-7 text-muted-foreground">
        {instructor.instructorProfile?.bio ||
          "No professional bio added yet."}
      </p>
    </div>
  </section>

  {/* Account Status */}
  <section className="flex flex-col gap-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-orange-600 shadow-sm dark:text-orange-400">
        <ShieldCheck size={21} />
      </div>

      <div>
        <h3 className="font-semibold text-foreground">
          Your faculty account is{" "}
          {instructor.userStatus === "ACTIVE" ? "active" : "inactive"}
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Keep your professional and contact information up to date
          to receive important university notifications.
        </p>
      </div>
    </div>

    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-orange-700 dark:text-orange-400">
      <BadgeCheck size={15} />
      {instructor.emailVerified
        ? "Account Verified"
        : "Email Not Verified"}
    </span>
  </section>

  <p className="text-right text-xs text-muted-foreground">
    Last updated: {formatDate(instructor.updateAt)}
  </p>
</div>

);
}

function SectionHeader({
icon,
title,
description,
color,
}: {
icon: React.ReactNode;
title: string;
description: string;
color: "orange" | "blue" | "purple";
}) {
const styles = {
orange: "bg-orange-500/10 text-orange-600 dark",
blue: "bg-blue-500/10 text-blue-600 dark",
purple: "bg-purple-500/10 text-purple-600 dark",
};

return (
<div className="flex items-center gap-3 border-b border-border pb-5">
<div
 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles[color]}`}
>
{icon}
</div>

  <div className="min-w-0">
    <h2 className="font-bold text-foreground">{title}</h2>
    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
  </div>
</div>

);
}

function InfoItem({
icon,
label,
value,
}: {
icon: React.ReactNode;
label: string;
value?: string | null;
}) {
return (
<div className="flex min-w-0 gap-3 border-b border-border py-5">
<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
{icon}
</div>

  <div className="min-w-0 flex-1">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 break-words text-sm font-semibold leading-6 text-foreground">
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
value?: string | null;
}) {
return (
<div className="flex min-w-0 items-start gap-3">
<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
{icon}
</div>

  <div className="min-w-0 flex-1">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 break-words text-sm font-semibold leading-6 text-foreground">
      {value || "Not assigned"}
    </p>
  </div>
</div>

);
}

function ProfessionalItem({
icon,
label,
value,
}: {
icon: React.ReactNode;
label: string;
value?: string | null;
}) {
return (
<div className="flex min-w-0 items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-orange-500/30 hover:bg-muted/50">
<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
{icon}
</div>

  <div className="min-w-0 flex-1">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 break-words text-sm font-semibold leading-6 text-foreground">
      {value || "Not provided"}
    </p>
  </div>
</div>

);
}

function SummaryCard({
icon,
label,
value,
color,
}: {
icon: React.ReactNode;
label: string;
value?: string | null;
color: "orange" | "blue" | "emerald";
}) {
const styles = {
orange: "bg-orange-500/10 text-orange-600 dark",
blue: "bg-blue-500/10 text-blue-600 dark",
emerald: "bg-emerald-500/10 text-emerald-600 dark",
};

return (
<div className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
<div
className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles[color]}`}
>
{icon}
</div>

  <div className="min-w-0">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 wrap-break-word text-base font-bold text-foreground">
      {value || "Not provided"}
    </p>
  </div>
</div>

);
}