import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/services/ai.server";

export const useFetchChats = () => {
    return useQuery({
        queryKey: ["chats"],
        queryFn: fetchChats,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
    });
};
