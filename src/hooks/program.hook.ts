import { useMutation, useQuery } from '@tanstack/react-query';
import { adminCreateProgram, getAllPrograms } from '../api/program.api';


export function useGetProgram(){
    return useQuery({
        queryKey:['programs'],
        queryFn:getAllPrograms,
        
    })
}

export function useProgram(){
    return useMutation({
         mutationFn:adminCreateProgram
    })
}