import { useMutation } from '@tanstack/react-query';
import { userLogin, userRegister } from '../api';

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