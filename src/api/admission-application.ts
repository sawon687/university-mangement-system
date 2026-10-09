import { useParams } from '../hooks/params.hook';
import apiFetch from "../lib/api-ofetch";
import { AdmissionQuery, IAdmissionApplication, ReviewAdmisson } from "../type/admisson-applilcation.type";

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

export function getAdminStudentAdmission(query:AdmissionQuery) {
  const params=new URLSearchParams()

  if(query.search?.trim)
  {
     params.set('serach',query.search)
  }
  if(query.status && query.status!=='All')
  {
     params.set('status',query.status)
  }
  return apiFetch(`/admin/studentadmissionsApplication?${params.toString()}`, {
    method: "GET",
  
  });
}



export function admissionStatusUpdate(payload: ReviewAdmisson) {
  const { applicationId, status, rejectionReason } = payload;
console.log('application update',payload)
  const data: ReviewAdmisson = {
    status,
    ...(status === "REJECTED" && rejectionReason?.trim()
      ? { rejectionReason: rejectionReason.trim() }
      : { rejectionReason: "" }),
  };
console.log('data update admisson ',data)
  return apiFetch(`/admin/admissions/${applicationId}/status`, {
    method: "PATCH",
    body: data,
  });
}