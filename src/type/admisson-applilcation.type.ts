export type EducationType = "HSC" | "DIPLOMA";

export interface IAdmissionApplication {
  programId: string;
  educationType: EducationType;
  sscResult: File;
  hscResult?: File;
  diplomaResult?: File;
}
