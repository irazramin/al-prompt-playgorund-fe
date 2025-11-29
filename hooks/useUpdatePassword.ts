import { updatePassword } from "@/services/users.service"
import { PasswordSchema } from "@/utils/schemas/password.schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (data: PasswordSchema) => updatePassword(data),
        onSuccess: () => {
            toast.success("Password updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update password");
        },
    })
}
