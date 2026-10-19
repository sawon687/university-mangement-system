import apiFetch from '../lib/api-ofetch';

export function AichatPublic(payload:{message:string}){
return apiFetch('/ai/chat',{
    method:'POST',
    body:payload
    
})
}