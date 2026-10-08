import apiFetch from "../lib/api-ofetch";
import { IAdmissionApplication } from "../type/admisson-applilcation.type";

export function userAdmisstionApplication(payload: IAdmissionApplication) {
  console.log("payload received:", payload);

  const formData = new FormData();

 
  if (payload.sscResult) {
    formData.append("sscResult", payload.sscResult);
  }
  if (payload?.hscResult) {
    formData.append("hscResult", payload.hscResult);
  }
  if (payload?.diplomaResult) {
    formData.append("diplomaResult", payload.diplomaResult);
  }

 
  formData.append(
    "data",
    JSON.stringify({
      programId: payload.programId,
      educationType: payload.educationType,
    }),
  );


  return apiFetch("/users/application-admission", {
    method: "POST",
    body: formData,
  });
}

export function getStudentAdmission() {

  return apiFetch(`/users/my-application`, {
    method: "GET",
  });
}