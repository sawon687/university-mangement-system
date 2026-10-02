import apiFetch from "../lib/api-ofetch";
import { ILogin, IRegister, IUpdatePassword } from "../type";

export function userLogin(paylaod: ILogin) {
  console.log("paylaod data", paylaod);
  return apiFetch("/auth/login", { method: "POST", body: paylaod });
}

export function userRegister(payload: IRegister) {
  return apiFetch("/auth/register", { method: "POST", body: payload });
}

export function userVerify(payload: { email: string; otp: string,purpose:string }) {
  return apiFetch("/auth/verified-email", { method: "POST", body: payload });
}

export function userForgotPassword(email: string) {
    console.log('email',email)
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}


export function userUpdatePassword(payload:IUpdatePassword){
  return apiFetch('/auth/update-password',{
    method:"PATCH",
    body:payload
  })
}

export function getMe(){
  return apiFetch('/auth/getme',{
    method:"GET",
  })
}

export function userLoggedOut() {
  return apiFetch("/auth/logout", {
    method: "POST",
   
  });
}

