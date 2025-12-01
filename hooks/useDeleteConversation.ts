import { useMutation } from "@tanstack/react-query"
import { deleteConversation } from "@/services/ai.server"
import { toast } from "sonner"
import { queryClient } from "@/lib/react-query"

export const useDeleteConversation = () => {
    return useMutation({
        mutationFn: (chatId: string) => deleteConversation(chatId),
        onSuccess: async () => {
            toast.success("Chat deleted")
            await queryClient.refetchQueries({ queryKey: ["chats"] })
        },
        onError: (error) => {
            toast.error("Failed to delete chat")
            console.error(error)
        }
    })
}
