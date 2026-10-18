import { useQuery } from '@tanstack/react-query';
import { getStudentCGpa } from '../api/myCgpa.api';

export function useMycgpa(){
    return useQuery({
         queryKey:['mycgpa'],
         queryFn:getStudentCGpa
         
    })
}