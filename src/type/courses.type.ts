
export interface QueryParms {
  limit?: number;
  page?: number;
  departmentId?: string;
  userSearch?:string
  role?:  "ADMIN" | "STUDENT" | "INTRUCTOR" | "All Role"
  courseSearch?:string;
  instructorSearch?: string;
  status?:string
  department?:string
}

export interface ICourse {
  title: string;
  code: string;
  description: string;
  departmentId: string;
  programId: string;
  credit: number;
  semesterNumber: number;
}

