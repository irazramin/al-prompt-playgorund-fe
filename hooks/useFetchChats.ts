import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/services/ai.server";

export const useFetchChats = () => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: fetchChats,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
};
