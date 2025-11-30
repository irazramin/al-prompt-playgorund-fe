import { getProfile } from "@/services/users.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(),
        staleTime: 0,
        refetchOnMount: true,
    })
}