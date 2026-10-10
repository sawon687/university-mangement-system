import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInstrutorProfile } from '../api/instrutorProfile.api';

export function useInstrutorProfileUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInstrutorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
}
