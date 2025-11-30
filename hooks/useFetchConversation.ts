import { useQuery } from "@tanstack/react-query";
import { fetchConversation } from "@/services/ai.server";

export const useFetchConversation = (chatId: string | undefined) => {
    return useQuery({
        queryKey: ["conversation", chatId],
        queryFn: () => fetchConversation(chatId!),
        enabled: !!chatId, // Only fetch if chatId exists
        staleTime: 0, // Always fetch fresh data
        refetchOnWindowFocus: false,
    });
};
