import apiFetch from "../lib/api-ofetch";
import { ISemester, IUpdateSemester } from "../type/semester.type";

export function adminSemester(paylaod: ISemester) {
  return apiFetch("/admin/create-semester", {
    method: "POST",
    body: paylaod,
  });
}

export function getAllSemester() {
  return apiFetch(`/admin/all-semester`, {
    method: "GET",
  });
}

export function updateSemester(data: IUpdateSemester & { id: string }) {
  console.log("data sawon", data);
  const id=data.id
  const payload = {
    startDate: data.startDate,
    endDate: data.endDate,
    registrationOpen: data.registrationOpen,
  };

  return apiFetch(`/admin/update-semester/${id}`, {
    method: "PATCH",
    body: payload,
  });
}
