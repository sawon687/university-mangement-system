
import { useParams } from '../hooks/params.hook';
import apiFetch from '../lib/api-ofetch';
import { QueryParms } from '../type/courses.type';

export function getUsers(params:QueryParms) {
console.log('params sawon',params)
const usersParams=useParams(params)
console.log('params Users')

  return apiFetch(`/admin/users?${usersParams.toString()}`, {
    method: "GET",
  });
}