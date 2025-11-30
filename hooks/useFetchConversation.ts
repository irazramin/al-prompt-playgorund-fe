import { useQuery } from "@tanstack/react-query";
import { fetchConversation } from "@/services/ai.server";

export const useFetchConversation = (chatId: string | undefined) => {
    return useQuery({
        queryKey: ["conversation", chatId],
        queryFn: () => fetchConversation(chatId!),
        enabled: !!chatId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
};
