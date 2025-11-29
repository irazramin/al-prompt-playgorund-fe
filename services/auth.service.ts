import api from "@/utils/api/api"
import { LoginSchema } from "@/utils/schemas/login.schema"
import { LOGIN_URL, REGISTER_URL } from "@/constants/api.constants"
import { RegistrationSchema } from "@/utils/schemas/registration.schema"
import { ApiResponse } from "@/types/api.types"

export const login = async (data: LoginSchema): Promise<ApiResponse> => {
    try {
        const response = await api.post(LOGIN_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const register = async (data: RegistrationSchema): Promise<ApiResponse> => {
    try {
        const response = await api.post(REGISTER_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}
