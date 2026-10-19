import InstructorProfilePage from "../../../../components/modules/instrutorProfile/instrutorprofile";

export default function Page() {
  return (
    <main className="min-h-screen bg-background p-4 text-foreground transition-colors duration-300 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            Instructor Dashboard / Profile
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your personal information and academic identity.
          </p>
        </header>

        <InstructorProfilePage />
      </div>
    </main>
  );
}
