import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgramCardSkeletonProps {
  count?: number;
}

export default function ProgramCardSkeleton({
  count = 8,
}: ProgramCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="flex h-full min-h-[440px] flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm"
        >
          {/* Image Skeleton */}
          <Skeleton className="aspect-[16/10] w-full rounded-none" />

          <CardHeader className="space-y-3 p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
          </CardHeader>

          <CardContent className="flex-1 space-y-3 px-4 pb-4">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-11/12" />
            <Skeleton className="h-3.5 w-3/4" />

            {/* Metadata */}
            <div className="mt-5 space-y-3 rounded-xl border border-border p-3">
              <div className="flex justify-between gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>

              <div className="flex justify-between gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto p-4 pt-0">
            <Skeleton className="h-10 w-full rounded-xl" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}