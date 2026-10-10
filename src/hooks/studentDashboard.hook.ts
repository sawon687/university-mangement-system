
import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from '../api/adminDasbhord';
import { getStudentDashboard } from '../api/studentDashbaord.api';


export function useGetStudentDasbordStats() {
  return useQuery({
    queryKey: ["student dashbard"],
    queryFn: getStudentDashboard,
    retry: false,
  });
}

