
import apiFetch from '../lib/api-ofetch';
import { ApiResponse } from '../type/api.type';

export function getStudentCGpa<T>(){
    return apiFetch<ApiResponse<T>>(`/users/my-gpa`,{
        method:'GET'
    })
}