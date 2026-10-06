import { cacheLife } from 'next/cache';
import type { ApiResponse } from "../type/api.type";
import { InitialPrograms, IProgram } from "../type/program.type";
import apiFetch from '../lib/api-ofetch';
export async function getAllPublicPrograms() {
  "use cache";
  cacheLife({ revalidate: 3600 });

  return apiFetch<ApiResponse<InitialPrograms>>(`/users/all-program`, {
    method: "GET",
  });
}
