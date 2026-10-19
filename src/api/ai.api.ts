import apiFetch from '../lib/api-ofetch';
import { ApiResponse } from '../type/api.type';

export function AichatPublic(payload:{message:string}){
return apiFetch('/ai/chat',{
    method:'POST',
    body:payload
    
})
}


export interface AcademicSubjectInsight {
  name: string;
  courseCode: string;
  gradePoint: number;
  credit: number;
}

export interface SemesterInsight {
  semester: string;
  year: number;
  gpa: number;
  subjects: AcademicSubjectInsight[];
}

export interface AcademicInsightsResponse {
  success: boolean;
  message: string;
  data: {
    currentCGPA: number | null;
    semesters: SemesterInsight[];
    insights: string;
  };
}

 

export function getAcademicInsights () {
    return apiFetch<ApiResponse<AcademicInsightsResponse> >("/ai/academic-insights", {
      method: "GET",
    });
  };
