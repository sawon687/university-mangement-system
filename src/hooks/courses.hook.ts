import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { admincreateCourse, getCourseAsssignmentData } from '../api/courses.api';
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