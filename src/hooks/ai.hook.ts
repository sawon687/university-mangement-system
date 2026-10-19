import { useMutation } from '@tanstack/react-query';
import { AichatPublic } from '../api/ai.api';

export function useAiChatBox(){
    return useMutation({
         mutationFn:AichatPublic
    })
}
