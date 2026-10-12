
import { useParams } from '../hooks/params.hook';
import apiFetch from "../lib/api-ofetch";
import { QueryParms } from '../type';
import { IProgram } from '../type/program.type';


export function getAllPrograms(params:QueryParms) {
  const searchParasm=useParams(params)
  console.log('searchparms',searchParasm)
  return apiFetch(`/admin/all-program?${searchParasm.toString()}`, {
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

