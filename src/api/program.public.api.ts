import { cacheLife } from "next/cache";
import type { ApiResponse } from "../type/api.type";
import { InitialPrograms, IProgram } from "../type/program.type";
import apiFetch from "../lib/api-ofetch";
import { QueryParms } from "../type/courses.type";
import { useParams } from "../hooks/params.hook";
export async function getAllPublicPrograms(searchParams: QueryParms) {
  "use cache";
  cacheLife({ revalidate: 3600 });

  const params = useParams(searchParams);
  const query = Object.fromEntries(params.entries());

  console.log("qeuery", query);
  return apiFetch<ApiResponse<InitialPrograms>>(`/users/all-program`, {
    method: "GET",
    query,
  });
}

export async function getDetilsPublicPrograms(id: string) {
  "use cache";
  cacheLife({ revalidate: 3600 });

  return apiFetch<ApiResponse<IProgram>>(`/users/all-program/${id}`, {
    method: "GET",
  });
}
