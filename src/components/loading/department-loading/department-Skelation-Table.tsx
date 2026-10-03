import { Skeleton } from "@/components/ui/skeleton";
import {  TableCell, TableRow } from "@/components/ui/table";

export function DepartmentTableSkeleton() {
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        </TableCell>

        {/* Code */}
        <TableCell>
          <Skeleton className="h-6 w-12 rounded-md" />
        </TableCell>

        {/* Students */}
        <TableCell>
          <Skeleton className="h-4 w-10" />
        </TableCell>

        {/* Instructors */}
        <TableCell>
          <Skeleton className="h-4 w-10" />
        </TableCell>

        {/* Programs */}
        <TableCell>
          <Skeleton className="h-4 w-10" />
        </TableCell>

        {/* Courses */}
        <TableCell>
          <Skeleton className="h-4 w-10" />
        </TableCell>

        {/* Action */}
        <TableCell>
          <Skeleton className="ml-auto size-8 rounded-md" />
        </TableCell>
      </TableRow>
    </>
  );
}
