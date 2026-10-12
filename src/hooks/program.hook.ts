import { useMutation, useQuery } from '@tanstack/react-query';
import { adminCreateProgram, getAllPrograms } from '../api/program.api';
import { QueryParms } from '../type';


export function useGetProgram(params:QueryParms){
    return useQuery({
        queryKey:['programs',params],
        queryFn:()=>getAllPrograms(params),
        
    })
}

export function useProgram(){
    return useMutation({
         mutationFn:adminCreateProgram
    })
}