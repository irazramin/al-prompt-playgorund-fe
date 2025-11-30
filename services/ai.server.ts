import api from "@/utils/api/api"
import { CHAT_URL } from "@/constants/api.constants"
import { aiPayload } from "@/types/ai.types"

export const generateStream = async (data: aiPayload) => {
    try {
        const response = await api.post(CHAT_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}