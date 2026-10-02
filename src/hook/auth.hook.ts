import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe, userForgotPassword, userLoggedOut, userLogin, userRegister, userUpdatePassword, userVerify } from '../api';

export function useLogin(){
    return useMutation({
         mutationFn:userLogin
    })
}

export function useRegister(){
    return useMutation({
         mutationFn:userRegister
    })
}

export function useVerify(){
    return useMutation({
         mutationFn:userVerify
    })
}

export function useForgotPassword(){
    return useMutation({
         mutationFn:userForgotPassword
    })
}

export function useUpdatePassword(){
    return useMutation({
         mutationFn:userUpdatePassword
    })
}

export function useGetMe(){
    return useQuery({
        queryKey:['user'],
        queryFn:getMe,
        retry:false
    })
}

export function useLoggedOut(){
    return useMutation({
         mutationFn:userLoggedOut
    })
}
