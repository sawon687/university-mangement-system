export type ExamType =
  | "MIDTERM"
  | "FINAL"
  | "QUIZ"
  | "ASSIGNMENT"
  | "PRACTICAL"
  | "VIVA";

export interface IExam {
  semesterId: string;
  instructorId: string;
  examType: ExamType;
  examDate: string | Date;
  totalMarks: number;
  courseId:string
}

export interface CourseMarks{
   studentId: string;
    courseId: string;
    semesterId: string;
    attendanceMarks: number;
    assignmentMarks: number;
    midMarks: number;
    finalExamMarks: number;
}