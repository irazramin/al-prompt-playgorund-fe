import { generateStream } from "@/services/ai.server";
import { aiPayload } from "@/types/ai.types";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGenerateAi = () => {
    return useMutation({
        mutationFn: (data: aiPayload) => generateStream(data),
        onSuccess: () => {
            toast.success("Profile updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    })
}