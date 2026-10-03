'use client'
import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { useGetProgram } from '../../../hooks/program.hook';
import ProgramList from './program-all-card';
import ProgramsTabs from './pragrams-tabs';

const ProgramsPage = () => {
    const { data, isPending } = useGetProgram()

    const programs=data?.data?.programs||[]
  return (
    <div>
      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* <OverviewCard
          title="Total Programs"
          value={programs.length}
          icon={<BookOpen className="size-5" />}
          description="All academic programs"
        />

        <OverviewCard
          title="Active Programs"
          value={activePrograms.length}
          icon={<GraduationCap className="size-5" />}
          description="Currently available"
        />

        <OverviewCard
          title="Inactive Programs"
          value={inactivePrograms.length}
          icon={<CalendarDays className="size-5" />}
          description="Currently unavailable"
        />

        <OverviewCard
          title="Total Credits"
          value={programs.reduce(
            (total, program) => total + program.totalCredits,
            0,
          )}
          icon={<Wallet className="size-5" />}
          description="Across all programs"
        /> */}
      </div>

      {/* Programs */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Academic Programs</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage university programs.
              </p>
            </div>
          </div>
        </CardHeader>
        <ProgramsTabs/>
    <ProgramList programs={programs} />
      </Card>
    </div>
  );
};

export default ProgramsPage;
