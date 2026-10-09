import { IUser } from './auth.type';
import { IProgram } from './program.type';

export type EducationType = "HSC" | "DIPLOMA";

export interface IAdmissionApplication {
  id?:string;
  programId: string;
  educationType: EducationType;
  sscResult: File;
  hscResult?: File;
  diplomaResult?: File;
  user:IUser;
  program:IProgram;
  status?:'PENDING'|"ACCEPTED" | "REJECTED"|"PAID"

}

export interface AdmissionQuery {
  search?: string;

  status?: 'PENDING'|"ACCEPTED" | "REJECTED"|"PAID"| 'All';
}


export interface ReviewAdmisson{
	status:"ACCEPTED" | "REJECTED",
     rejectionReason?:string
       
     applicationId?:string
	 
}