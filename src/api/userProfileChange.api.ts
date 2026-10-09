import apiFetch from '../lib/api-ofetch';

export function userProfilePicChange(file: File) {

    const form=new FormData()
    if(file)
    {
          form.append('/profileImage',file)
    }

  return apiFetch("/user/profile-image", {
    method: "POST",
    body:form,
  });
}