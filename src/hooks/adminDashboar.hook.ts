
import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from '../api/adminDasbhord';


export function useGetAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    retry: false,
  });
}

