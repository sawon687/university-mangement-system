import apiFetch from '../lib/api-ofetch';
import { ILogin, IRegister } from '../type';

export function userLogin(paylaod:ILogin){
    console.log('paylaod data',paylaod)
    return apiFetch('/auth/login',{method:'POST',body:paylaod})
}

export function userRegister(paylaod:IRegister){
    return apiFetch('/auth/register',{method:"POST",body:paylaod})
}