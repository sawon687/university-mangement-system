import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users.api';
import { QueryParms } from '../type/courses.type';

export function useGetUsers(params:QueryParms){
    console.log('params',params)
    return useQuery({
        queryKey:['users',params],
        queryFn:()=>getUsers(params)
        
    })
}