import apiFetch from '../lib/api-ofetch';
import { IStudentProfile } from '../type';

export function updateInstrutorProfile(paylaod:IStudentProfile) {
  return apiFetch("/teacher/update-teacher-profile", {
    method: "PATCH",
    body: paylaod,
  });
}
