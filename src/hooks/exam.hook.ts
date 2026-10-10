import { useMutation } from '@tanstack/react-query'
import { instructorcreateExam } from '../api/exam.api'



export function useCreateExam(){
   
    return useMutation({
        mutationFn:instructorcreateExam
    })
}