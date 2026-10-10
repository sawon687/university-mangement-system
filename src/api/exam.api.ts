import apiFetch from "../lib/api-ofetch";
import { IExam } from "../type/exam.type";

export function instructorcreateExam(paylaod: IExam) {
  return apiFetch(`/teacher/mycourse/${paylaod.courseId}/exam`, {
    method: "POST",
    body: {
      semesterId: paylaod.semesterId,
      instructorId: paylaod.instructorId,
      examType: paylaod.examType,
      examDate: paylaod.examDate,
      totalMarks: paylaod.totalMarks,
    },
  });
}
