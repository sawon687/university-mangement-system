import ProgramCardSkeleton from '../../../../components/modules/program.public/programCardSkelation';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <SkeletonHeading />
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonBar />
            <SkeletonBar />
            <SkeletonBar />
            <SkeletonBar />
          </div>
        </div>

        <ProgramCardSkeleton count={8} />
      </section>
    </main>
  );
}

function SkeletonHeading() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
    </div>
  );
}

function SkeletonBar() {
  return (
    <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
  );
}