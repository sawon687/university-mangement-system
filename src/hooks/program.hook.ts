import { useQuery } from '@tanstack/react-query';
import { getAllPrograms } from '../api/program.api';

export function useGetProgram(){
    return useQuery({
        queryKey:['programs'],
        queryFn:getAllPrograms,
        
    })
}