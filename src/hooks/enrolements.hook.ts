import { useQuery } from '@tanstack/react-query';
import { getStudentEnrolement } from '../api/enrolements.api';

export function useGetStudentEnrolement(id:string){
    return useQuery({
        queryKey:['student-Enrolement',id],
        queryFn:()=>getStudentEnrolement(id!),
        enabled:!!id
        
    })
}