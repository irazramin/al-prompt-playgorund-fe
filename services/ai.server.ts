import api from "@/utils/api/api"
import { CHAT_URL, FETCH_CHATS_URL, FETCH_CONVERSATION_URL, ENHANCE_PROMPT_URL, UPDATE_CONVERSATION_TITLE_URL, DELETE_CONVERSATION_URL } from "@/constants/api.constants"
import { aiPayload } from "@/types/ai.types"

export const generateStream = async (data: aiPayload) => {
    try {
        const response = await api.post(CHAT_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchChats = async () => {
    try {
        const response = await api.get(FETCH_CHATS_URL)
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchConversation = async (chatId: string) => {
    try {
        const url = FETCH_CONVERSATION_URL.replace(':chatId', chatId)
        const response = await api.get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export const enhancePrompt = async (data: { prompt: string, provider: string, aiModel: string, temperature: number }) => {
    try {
        const response = await api.post(ENHANCE_PROMPT_URL, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateConversationTitle = async (chatId: string, title: string) => {
    try {
        const url = UPDATE_CONVERSATION_TITLE_URL(chatId)
        const response = await api.patch(url, { title })
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteConversation = async (chatId: string) => {
    try {
        const url = DELETE_CONVERSATION_URL(chatId)
        const response = await api.delete(url)
        return response.data
    } catch (error) {
        throw error
    }
}