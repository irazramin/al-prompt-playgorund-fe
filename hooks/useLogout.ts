import { useMutation } from "@tanstack/react-query"
import { logout } from "@/services/auth.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { queryClient } from "@/lib/react-query"

export const useLogout = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.clear()

            if (typeof window !== 'undefined') {
                localStorage.clear()
                sessionStorage.clear()
            }

            toast.success("Logged out successfully")

            router.push('/login')
        },
        onError: (error) => {
            toast.error("Failed to logout")
            console.error(error)
        }
    })
}
