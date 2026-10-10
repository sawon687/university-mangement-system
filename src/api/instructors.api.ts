import { useParams } from "../hooks/params.hook";
import apiFetch from "../lib/api-ofetch";
import { QueryParms } from "../type/courses.type";

// export function getCourseAsssignmentData(params: QueryParms) {
//   const searchParams = useParams(params);

//   return apiFetch(`/admin/course-assignment?${searchParams.toString()}`, {
//     method: "GET",
//   });
// }

export function createInstructor(payload: Record<string, unknown>) {
  return apiFetch("/admin/create-teacher", {
    method: "POST",
    body: payload,
  });
}
