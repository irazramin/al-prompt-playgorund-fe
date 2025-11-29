import { useMutation } from "@tanstack/react-query";
import { RegistrationSchema } from "@/utils/schemas/registration.schema";
import { register } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegistrationSchema) => register(data),
        onSuccess: () => {
            toast.success("Registered successfully. Verification email sent to your email address.");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to register");
        },
    });
}