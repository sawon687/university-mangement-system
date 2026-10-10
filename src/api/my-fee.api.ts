import apiFetch from '../lib/api-ofetch';


export function getMyInstallmentFee(id: string) {
  return apiFetch(`/users/myInstalmentFee?semesterId=${id}`, {
    method: "GET",
  });
}