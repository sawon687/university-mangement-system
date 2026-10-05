import { useMutation } from '@tanstack/react-query';
import { createInstructor } from '../api/instructors.api';

export function useCreateInsructor(){
    return useMutation({
         mutationFn:createInstructor
    })
}