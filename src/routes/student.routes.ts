import {
  LayoutDashboard,
  GraduationCap,
  UserRound,
  CalendarDays,
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  FileText,
  Award,
  ScrollText,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react";

export const studentroutes = [
  {
    title: "Management",
    url: "#",
    items: [
      {
        name: "Overview",
        title: "Overview",
        url: "/student",
        icon: LayoutDashboard,
      },
      {
        name: "Admission",
        title: "My Admission",
        url: "/student/admission",
        icon: GraduationCap,
      },
      {
        name: "Profile",
        title: "Profile",
        url: "/student/profile",
        icon: UserRound,
      },
      {
        name: "Running Semester",
        title: "Running Semester",
        url: "/dashboard/student/semester",
        icon: CalendarDays,
      },
      {
        name: "Course Enrollment",
        title: "Course Enrollment",
        url: "/dashboard/student/courses",
        icon: BookOpen,
      },
      {
        name: "Schedule",
        title: "Schedule",
        url: "/dashboard/student/schedule",
        icon: CalendarClock,
      },
      {
        name: "Attendance",
        title: "Attendance",
        url: "/dashboard/student/attendance",
        icon: ClipboardCheck,
      },
      {
        name: "Exams",
        title: "Exams",
        url: "/dashboard/student/exams",
        icon: FileText,
      },
      {
        name: "Results",
        title: "Results",
        url: "/dashboard/student/results",
        icon: Award,
      },
      {
        name: "Transcript",
        title: "Transcript",
        url: "/dashboard/student/transcript",
        icon: ScrollText,
      },
      {
        name: "Payments",
        title: "Payments",
        url: "/student/my-payments",
        icon: CreditCard,
      },
      {
        name: "Notifications",
        title: "Notifications",
        url: "/dashboard/student/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        title: "Settings",
        url: "/dashboard/student/settings",
        icon: Settings,
      },
    ],
  },
];
