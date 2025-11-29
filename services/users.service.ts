import { PROFILE_URL } from "@/constants/api.constants"
import api from "@/utils/api/api"
import { ApiResponse } from "@/types/api.types"
import { ProfileSchema } from "@/utils/schemas/profile.schema"

export const getProfile = async (): Promise<ApiResponse> => {
    try {
        const response = await api.get(PROFILE_URL)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateProfile = async (data: ProfileSchema): Promise<ApiResponse> => {
    try {
        const response = await api.put(PROFILE_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updatePassword = async (data: any): Promise<ApiResponse> => {
    try {
        const response = await api.put("/users/password", data)
        return response.data
    } catch (error) {
        throw error
    }
}