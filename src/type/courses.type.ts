import { IDepartment } from './departments.type';

export interface QueryParms {
  limit?: number;
  page?: number;
  departmentId?: string;
  search?:string
  role?:  "ADMIN" | "STUDENT" | "INTRUCTOR" | "All Role"
  courseSearch?:string;
  instructorSearch?: string;
  status?:string
  department?:string;
  degree?:"BSC"| "MSC"| "BA"| "BBA"|"MBA"|'All Degree';
  study?:"BI_SEMESTER"|"TRI_SEMESTER"| 'All Study'

}

export interface ICourse {
  title: string;
  code: string;
  description: string;
  departmentId: string;
  department:IDepartment
  programId: string;
  credit: number;
  semesterNumber: number;
}


