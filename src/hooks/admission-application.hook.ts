import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { admissionStatusUpdate, getAdminStudentAdmission, getStudentAdmission, userAdmisstionApplication } from '../api/admission-application';
import { AdmissionQuery, ReviewAdmisson } from '../type/admisson-applilcation.type';

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

export function useAdminGetAdmission(query:AdmissionQuery){
 
    return useQuery({
        queryKey:['admn-student-application',query],
        queryFn:()=>getAdminStudentAdmission(query)
        
    })
}

export function useupdateAdmissionApplication(){
    const queryClient=useQueryClient()
    return useMutation({
         mutationFn:admissionStatusUpdate,
          onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admn-student-application"],
      });
    }})
}
