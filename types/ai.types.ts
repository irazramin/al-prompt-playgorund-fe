export interface aiPayload {
    chatId: string;
    prompt: string;
    aiModel: string;
    temperature: number;
    provider: string;
    userId: string;
}

export interface Chat {
    _id: string;
    chatId: string;
    userId: string;
    title: string;
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}