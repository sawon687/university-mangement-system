import apiFetch from "../lib/api-ofetch";

export function getStudentEnrolement(id:string) {
  console.log('semester en',id)

  return apiFetch(`/users/my-enrolement/${id}`, {
    method: "GET",
  });
}
