import apiFetch from '../lib/api-ofetch';

interface InstructorDashboardStats {
  assignedCourseCount: number;
  totalStudentCount: number;
  totalExamCount: number;
  totalMarksSubmitted: number;
}


interface DashboardResponse {
  success: boolean;
  message: string;
  data: InstructorDashboardStats;
}

export async function getInstructorDashboardStats() {
  return apiFetch<DashboardResponse>(
    "/teacher/dashboard-stats",
    {
      method: "GET",
    },
  );
}