
import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from '../api/adminDasbhord';
import { getInstructorDashboardStats } from '../api/instrutorDasboard.api';


export function useGetInstrutorStats() {
  return useQuery({
    queryKey: ["instructor-dashboard-stats"],
    queryFn: getInstructorDashboardStats,
    retry: false,
  });
}



