import { IUser } from './auth.type';
import { IDepartment } from './departments.type';

export interface QueryParms {
  limit?: number;
  page?: number;
  departmentId?: string;
  search?:string
  role?:  "ADMIN" | "STUDENT" | "INTRUCTOR" | "All Role"
  courseSearch?:string;
  userSearch?:string
  instructorSearch?: string;
  status?:string
  department?:string;
  degree?:"BSC"| "MSC"| "BA"| "BBA"|"MBA"|'All';
  study?:"BI_SEMESTER"|"TRI_SEMESTER"| 'All '

}

export interface ICourse {
  id:string
  title: string;
  code: string;
  description: string;
  departmentId: string;
  department:IDepartment
  programId: string;
  credit: number;
  grade?:string
  gpa?:number
  semesterNumber: number;
  status?:"ASSIGNED"|"UNASSIGNED"
 instructor?:IUser
}


