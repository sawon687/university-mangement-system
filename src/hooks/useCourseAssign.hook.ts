import { useMutation } from '@tanstack/react-query';
import { adminCourseAssign } from '../api';

export function useCourseAssign(){
    return useMutation({
         mutationFn:adminCourseAssign
    })
}

