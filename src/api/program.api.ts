import apiFetch from '../lib/api-ofetch';

export function getAllPrograms() {
  return apiFetch(`/admin/all-program`, {
    method: "GET",
  });
}