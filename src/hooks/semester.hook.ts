import { useMutation, useQuery } from '@tanstack/react-query';
import { admincreateCourse } from '../api/courses.api';
import { adminSemester, getAllSemester, getStudentSemester, updateSemester } from '../api/semester.api';
import { IUpdateSemester } from '../type/semester.type';

export function useSemester(){
    return useMutation({
         mutationFn:adminSemester
    })
}

export function useGetSemester(){
    return useQuery({
        queryKey:['all-semester'],
        queryFn:getAllSemester
        
    })
}

export function useStudentSemester(){
  
    return useQuery({
        queryKey:['student-semester'],
        queryFn:getStudentSemester
      
        
    })
}


export function useUpdateSemester(){
    return useMutation({
         mutationFn:updateSemester
    })
}

