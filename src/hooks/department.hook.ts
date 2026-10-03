import { useMutation, useQuery } from '@tanstack/react-query';
import { adminDepartment, getDepartments } from '../api/deparment.api';
import { Search } from 'lucide-react';

export function useGetDepartment(search:string){
    return useQuery({
        queryKey:['departments',search],
        queryFn:()=>getDepartments(search),
        
    })
}
export function useDepartment(){
    return useMutation({
         mutationFn:adminDepartment
    })
}
