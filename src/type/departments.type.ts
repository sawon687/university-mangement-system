export interface ICountDepartment {
  students: number;
  teachers: number;
  program: number;
  course: number;
}

export interface IDepartment {
  id: string;
  code: string;
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: ICountDepartment;
}