import { updateProfile } from "@/services/users.service"
import { ProfileSchema } from "@/utils/schemas/profile.schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/lib/react-query"

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (data: ProfileSchema) => updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Profile updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    })
}