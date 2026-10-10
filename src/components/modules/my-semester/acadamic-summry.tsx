import React, { ElementType } from "react";
import { Card, CardContent } from "../../ui/card";
import {
  BookMarked,
  CalendarCheck,
  GraduationCap,
  Layers3,
} from "lucide-react";

interface IAcadamicsummryProps {
  totalCredit: number;
  totalSubject: number;
  semesterName: string;
}

const Acadamicsummry = ({
  totalCredit,
  totalSubject,
  semesterName,
}: IAcadamicsummryProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {" "}
      <SummaryCard
        icon={BookMarked}
        label="Enrolled Courses"
        value={totalSubject}
        description="Registered subjects"
        color="orange"
      />
      <SummaryCard
        icon={GraduationCap}
        label="Total Credits"
        value={totalCredit}
        description="Academic credits"
        color="blue"
      />
      <SummaryCard
        icon={Layers3}
        label="Semester"
        value={semesterName || "N/A"}
        description="Selected semester"
        color="purple"
      />
      <SummaryCard
        icon={CalendarCheck}
        label="Enrollment"
        value={totalSubject > 0 ? "Enrolled" : "Not enrolled"}
        description="Selected semester status"
        color="emerald"
      />
    </section>
  );
};

export default Acadamicsummry;

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  color,
}: {
  icon: ElementType;
  label: string;
  value: string | number;
  description: string;
  color: "orange" | "blue" | "purple" | "emerald";
}) {
  const styles = {
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  };

  return (
    <Card className="gap-0 py-5 transition-shadow hover:shadow-sm">
      {" "}
      <CardContent>
        {" "}
        <div className="flex items-start justify-between gap-3">
          {" "}
          <div className="min-w-0">
            {" "}
            <p className="text-sm text-muted-foreground">{label}</p>{" "}
            <p className="mt-3 break-words text-2xl font-bold">{value}</p>{" "}
          </div>
          <div className={`shrink-0 rounded-xl p-3 ${styles[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
