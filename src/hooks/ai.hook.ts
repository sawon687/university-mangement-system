import { useMutation, useQuery } from '@tanstack/react-query';
import { AichatPublic, getAcademicInsights } from '../api/ai.api';

export function useAiChatBox(){
    return useMutation({
         mutationFn:AichatPublic
    })
}




export const useAcademicInsights = () => {
  return useQuery({
    queryKey: ["student-academic-insights"],
    queryFn: getAcademicInsights,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};