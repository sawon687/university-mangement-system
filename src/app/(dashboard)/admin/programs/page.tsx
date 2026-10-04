import { GraduationCap } from "lucide-react";


import Link from "next/link";
import ProgramList from "../../../../components/modules/programs/program-all-card";
import { Suspense } from "react";
import ProgramListSkeleton from "../../../../components/modules/programs/program.loading";
import { Button } from '../../../../components/ui/button';

export default function page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Programs</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage academic programs and their information.
          </p>
        </div>

        <Button  render={<Link href={`/admin/programs/create`} />}>
          <GraduationCap className="mr-2 size-4" />
          Create Program
        </Button>
      </div>
  
        <ProgramList />
 
    </div>
  );
}
