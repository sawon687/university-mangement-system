export interface QueryParms {
  limit: number;
  page: number;
  departmentId?: string;
  courseSearch?: string;
  instructorSearch?: string;
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

