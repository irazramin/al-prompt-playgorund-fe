export interface aiPayload {
    chatId: string;
    prompt: string;
    aiModel: string;
    temperature: number;
    provider: string;
    userId: string;
}