import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentPayments, userPayments } from '../api/payments.api';

export function usePaymentsCreate(){
    return useMutation({
         mutationFn:userPayments
    })
}

export function useGetPayments(){
    return useQuery({
        queryKey:['student-payments'],
        queryFn:getStudentPayments
    })
}