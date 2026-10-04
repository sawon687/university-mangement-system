import { useParams } from "../hooks/params.hook";
import apiFetch from "../lib/api-ofetch";
import { ICourse, QueryParms } from "../type/courses.type";

export function getCourseAsssignmentData(params: QueryParms) {
  const searchParams = useParams(params);

  return apiFetch(`/admin/course-assignment?${searchParams.toString()}`, {
    method: "GET",
  });
}

export function admincreateCourse(paylaod:ICourse) {
  return apiFetch("/admin/create-course", {
    method: "POST",
    body:paylaod
  });
}