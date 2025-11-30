import { useMutation } from "@tanstack/react-query"
import { enhancePrompt } from "@/services/ai.server"
import { toast } from "sonner"

interface EnhancePromptParams {
    prompt: string
    provider: string
    aiModel: string
    temperature: number
}

export const useEnhancePrompt = () => {
    return useMutation({
        mutationFn: (data: EnhancePromptParams) => enhancePrompt(data),
        onSuccess: (response) => {
            if (response?.data?.enhancedPrompt) {
                toast.success("Prompt enhanced!")
            }
        },
        onError: (error) => {
            toast.error("Failed to enhance prompt")
            console.error(error)
        }
    })
}
