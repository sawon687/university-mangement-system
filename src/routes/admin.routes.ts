import {
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  LayoutDashboard,
  UserRoundCheck,
} from "lucide-react";
const prefix = "/admin";
export const adminRoutes = [
  {
    title: "Management",
    url: "#",
    items: [
      {
        title: "Dashbaord",
        url: `${prefix}`,
        icon: LayoutDashboard,
      },
      {
        title: "Departments",
        url: `${prefix}/departments`,
        icon: Building2,
      },
      {
        title: "All Programs",
        url: `${prefix}/programs`,
        icon: GraduationCap,
      },
       {
        title: "Student Admission",
        url: `${prefix}/student-admission`,
        icon: FileText,
      },

      {
        title: "Users",
        url: `${prefix}/users`,
        icon: UserRoundCheck,
      },
      {
        title: "Courses Assign",
        url: `${prefix}/courses`,
        icon: BookOpen,
      },
      {
        title: "Semesters",
        url: `${prefix}/semesters`,
        icon: CalendarDays,
      },
    ],
  },
];
