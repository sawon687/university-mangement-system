import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

const prefix = "/instructor";

export const instructorRoutes = [
  {
    title: "Teaching",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: `${prefix}`,
        icon: LayoutDashboard,
      },
      {
        title: "My Profile",
        url: `${prefix}/profile`,
        icon: UserRound,
      },
      {

    
        title: "My Courses",
        url: `${prefix}/course`,
        icon: BookOpen,
      },
      {
        title: "Exams",
        url: `${prefix}/exams`,
        icon: ClipboardList,
      },
      {
        title: "Student Marks",
        url: `${prefix}/marks`,
        icon: GraduationCap,
      },
      {
        title: "Results",
        url: `${prefix}/results`,
        icon: FileText,
      },
    ],
  },
];
