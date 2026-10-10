import apiFetch from '../lib/api-ofetch';



export interface AdminDashboardStats {
  userCount: number;
  studentCoutn: number;
  instructorCount: number;
  TotalMoney: {
    _sum: {
      amount: number | null;
    };
  };
}

export const getAdminStats = async (): Promise<AdminDashboardStats> => {
  return apiFetch<AdminDashboardStats>("/admin/dashboard-stats", {
    method: "GET",
  });
};

