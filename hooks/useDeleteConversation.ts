import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteConversation } from "@/services/ai.server"
import { toast } from "sonner"

export const useDeleteConversation = () => {
    const queryClient = useQueryClient()

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
