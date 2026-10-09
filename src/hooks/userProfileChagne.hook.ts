import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userProfilePicChange } from "../api/userProfileChange.api";
import { updateStudentProfile } from "../api/studentProfile.api";

export function useUpdateProfileChange() {
 
 const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userProfilePicChange,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

export function useStudentProfileUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
