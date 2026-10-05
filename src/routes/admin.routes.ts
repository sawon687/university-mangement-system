import {
  BookOpen,
  Building2,
  CalendarDays,
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
