import { IDepartment } from './departments.type';

export interface IProgram{
  id: string;
  name: string;
  department:IDepartment;
  degreeType: string;
  duration: number;
  totalCredits: number;
  semester: number;
  semesterType: string;
  description?: string;
  admissionFee: number;
  tuitionFee: number;
  perCreditFee: number;
  totalFee: number;
  isActive: boolean;
};
