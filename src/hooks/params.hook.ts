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
  if (payload.page) {
    params.set("page", payload.page.toString());
  }
  if (payload.limit) {
    params.set("limit", payload.limit.toString());
  }
  if (payload.role && payload.role !== "All Role") {
    params.set("role", payload.role);
  }

  if (payload.department && payload.department !== "All") {
    params.set("department", payload.department);
  }
  if (payload.status && payload.status !== "All") {
    params.set("status", payload.status);
  }
  if (payload.search) {
    params.set("search", payload.search);
  }
  if (payload.study && payload.study !== "All ") {
    params.set("study", payload.study);
  }
  if (payload.degree && payload.degree !== "All") {
    params.set("degree", payload.degree);
  }

  return params;
};
