import apiFetch from "../lib/api-ofetch";
import { IProgram } from "../type/program.type";

export function getAllPrograms() {
  return apiFetch(`/admin/all-program`, {
    method: "GET",
  });
}

export function adminCreateProgram(
  payload: Omit<IProgram, "id" | "department"> & { departmentId: string },
) {
  return apiFetch("/admin/create-program", {
    method: "POST",
    body: payload,
  });
}
