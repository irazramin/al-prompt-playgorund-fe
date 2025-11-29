import { getProfile } from "@/services/users.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(),
        staleTime: 5 * 60 * 1000,
    })
}