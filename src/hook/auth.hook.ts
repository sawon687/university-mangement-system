import { useMutation } from '@tanstack/react-query';
import { userForgotPassword, userLogin, userRegister, userUpdatePassword, userVerify } from '../api';

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


