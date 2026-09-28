import apiFetch from '../lib/api-ofetch';
import { ILogin } from '../type';

export function userLogin(paylaod:ILogin){
    console.log('paylaod data',paylaod)
    return apiFetch('/auth/login',{method:'POST',body:paylaod})
}