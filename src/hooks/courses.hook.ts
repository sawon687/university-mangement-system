import { useQuery } from '@tanstack/react-query';
import { getCourseAsssignmentData } from '../api/courses.api';
import { QueryParms } from '../type/courses.type';
import { useParams } from './params.hook';

export function useGetAssignmentData(params:QueryParms){
   
    return useQuery({
        queryKey:['departments',params],
        queryFn:()=>getCourseAsssignmentData(params),
        
    })
}