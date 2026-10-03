import apiFetch from '../lib/api-ofetch';
import { IDepartment } from '../type';

export function adminDepartment(paylaod:Omit<IDepartment | 'id','_count'>) {
  return apiFetch("/admin/department", {
    method: "POST",
    body:paylaod
  });
}

export function getDepartments(search:string) {
  return apiFetch(`/admin/department?search=${search}`, {
    method: "GET",
  });
}