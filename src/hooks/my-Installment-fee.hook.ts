import { useQuery } from '@tanstack/react-query';
import { getMyInstallmentFee } from '../api/my-fee.api';

export function useGetMyInstallmentFee(id:string){
    return useQuery({
        queryKey:['my-installment-fee',id],
        queryFn:()=> getMyInstallmentFee(id)
        
    })
}