import { useMutation } from "@tanstack/react-query"
import { deleteConversation } from "@/services/ai.server"
import { toast } from "sonner"
import { queryClient } from "@/lib/react-query"

export const useDeleteConversation = () => {
    return useMutation({
        mutationFn: (chatId: string) => deleteConversation(chatId),
        onSuccess: () => {
            toast.success("Chat deleted")
            queryClient.invalidateQueries({ queryKey: ["chats"] })
        },
        onError: (error) => {
            toast.error("Failed to delete chat")
            console.error(error)
        }
    })
}
