import { QueryParms } from "../type/courses.type";

export const useParams = (payload: QueryParms) => {
  const params = new URLSearchParams();

  if (payload.courseSearch?.trim()) {
    params.set("courseSearch", payload.courseSearch.trim());
  }

  if (payload.instructorSearch?.trim()) {
    params.set("instructorSearch", payload.instructorSearch.trim());
  }

  if (payload.departmentId) {
    params.set("departmentId", payload.departmentId);
  }

  params.set("page", payload.page.toString());
  params.set("limit", payload.limit.toString());

  return params;
};