import apiFetch from '../lib/api-ofetch';

export async function getStudentDashboard() {
  return apiFetch(
    "/users/dashboard",
    {
      method: "GET",
    },
  );
}