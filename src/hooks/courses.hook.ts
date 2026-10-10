import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { admincreateCourse, getCourseAsssignmentData, getInstrutorCourse, studentCourseMarks } from '../api/courses.api';
import { QueryParms } from '../type/courses.type';
import { useParams } from './params.hook';


export function useGetAssignmentData(params:QueryParms){
 
    return useQuery({
        queryKey:['departments',params],
        queryFn:()=>getCourseAsssignmentData(params),
        
    })
}

export function useCreateCourse(){
   
    return useMutation({
        mutationFn:admincreateCourse
    })
}

export function useGetInstrutorCourse(){
   return useQuery({
     queryKey:['my-Instrutor-Course'],
     queryFn:getInstrutorCourse
   })
}

export function useCreateCourseMarks(){
   
    return useMutation({
        mutationFn:studentCourseMarks
    })
}

