import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth.service";
import { LoginSchema } from "@/utils/schemas/login.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginSchema) => login(data),
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/dashboard"); // Adjust redirection as needed
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to login");
    },
  });
};