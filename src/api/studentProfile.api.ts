import apiFetch from '../lib/api-ofetch';
import { IStudentProfile } from '../type';

export function updateStudentProfile(paylaod:IStudentProfile) {
  return apiFetch("/users/me", {
    method: "PATCH",
    body: paylaod,
  });
}
