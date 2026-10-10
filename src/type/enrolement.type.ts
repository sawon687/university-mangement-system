import { ICourse } from './courses.type';
import { IFee } from './fee.type';
import { ISemester } from './semester.type';
export interface ICourseEnrollment {
  id: string;
  enrollmentId: string;
  courseId: string;
  course: ICourse;
}


export interface IEnrollment {
  id: string;
  studentId: string;
  semesterId: string;
  semester: ISemester;
  Enrolementcourses: ICourseEnrollment[];
  totalCredit:number,
  createdAt: string;
  fee?: IFee;
}