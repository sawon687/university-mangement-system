import { useParams } from "../hooks/params.hook";
import apiFetch from "../lib/api-ofetch";
import {  IUser } from "../type";
import { ApiResponse } from "../type/api.type";
import { ICourse, QueryParms } from "../type/courses.type";
import { CourseMarks } from "../type/exam.type";
import { MetaData } from "../type/program.type";
export interface ICourseAssignmentResponse {
  course: ICourse[];
  instructor: IUser[];
  meta: MetaData;
}

export function getCourseAsssignmentData(params: QueryParms) {
  const searchParams = useParams(params);

  return apiFetch<ApiResponse<ICourseAssignmentResponse>>(
    `/admin/course-assignment?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
}

export function admincreateCourse(paylaod: ICourse) {
  return apiFetch("/admin/create-course", {
    method: "POST",
    body: paylaod,
  });
}

export function adminCourseAssign(paylaod: {
  courseId: string;
  instructorId: string;
  semesterId: string;
}) {
  return apiFetch(`/admin/course/${paylaod.courseId}/assign`, {
    method: "POST",
    body: paylaod,
  });
}

export function getInstrutorCourse() {
  return apiFetch(`/teacher/course/my-assigned`, {
    method: "GET",
  });
}

export function studentCourseMarks(payload: CourseMarks) {
  return apiFetch(`/teacher/corse-marks/${payload.courseId}`, {
    method: "POST",
    body: payload,
  });
}
