import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentAdmission, userAdmisstionApplication } from '../api/admission-application';

export function useAdmissionApplication(){
    return useMutation({
         mutationFn:userAdmisstionApplication
    })
}

export function useGetAdmission(){
 
    return useQuery({
        queryKey:['my-application'],
        queryFn:getStudentAdmission
        
    })
}