"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChatInput } from "@/components/chat/chat-input"
import { MessageList } from "@/components/chat/message-list"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAI } from "@/components/context/ai-context"
import crypto from 'crypto'
import { aiPayload } from "@/types/ai.types"
import { models } from "@/constants/ai-models"
import { CHAT_URL } from "@/constants/api.constants"
import { useFetchConversation } from "@/hooks/useFetchConversation"
import { queryClient } from "@/lib/react-query"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface ChatInterfaceProps {
    id?: string
}

export function ChatInterface({ id }: ChatInterfaceProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const initialized = useRef(false)
    const conversationLoaded = useRef(false)
    const { model, temperature } = useAI()
    const { data: conversationData, isLoading: isLoadingConversation } = useFetchConversation(id)

    useEffect(() => {
        setMessages([])
        initialized.current = false
        conversationLoaded.current = false

        if (conversationData?.data && Array.isArray(conversationData.data)) {
            const loadedMessages: Message[] = []
            conversationData.data.forEach((msg: any) => {
                loadedMessages.push({ role: "user", content: msg.prompt })
                loadedMessages.push({ role: "assistant", content: msg.reply })
            })
            setMessages(loadedMessages)
            conversationLoaded.current = true
        }
    }, [id, conversationData])

    useEffect(() => {
        if (!initialized.current && id) {
            const q = searchParams.get("q")
            if (q) {
                initialized.current = true
                handleSend(q)
            }
        }
    }, [id, searchParams])

    const handleSend = async (content: string) => {
        let chatId = id;
        if (!chatId) {
            chatId = crypto.randomBytes(16).toString('hex');
            router.push(`/chat/${chatId}?q=${encodeURIComponent(content)}`)
            return
        }

        const selectedModel = models.find(m => m.value === model)
        const provider = selectedModel ? selectedModel.type : "openai"
        const userId = JSON.parse(localStorage.getItem("user") || "{}")?._id

        const payload: aiPayload = {
            chatId: chatId,
            prompt: content,
            aiModel: model,
            temperature: temperature,
            provider: provider,
            userId: userId
        }

        const userMessage: Message = { role: "user", content }
        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)

        const assistantMessage: Message = { role: "assistant", content: "" }
        setMessages((prev) => [...prev, assistantMessage])

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'
            const response = await fetch(`${baseUrl}${CHAT_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (!reader) return

            let buffer = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                buffer += chunk

                const lines = buffer.split('\n\n')
                buffer = lines.pop() || ''

                for (const line of lines) {
                    const eventMatch = line.match(/^event: (.*)$/m)
                    const dataMatch = line.match(/^data: (.*)$/m)

                    if (eventMatch && dataMatch) {
                        const event = eventMatch[1]
                        const data = JSON.parse(dataMatch[1])

                        if (event === 'chunk') {
                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = newMessages[newMessages.length - 1]
                                if (lastMessage.role === 'assistant') {
                                    lastMessage.content += data.content
                                }
                                return newMessages
                            })
                        } else if (event === 'complete') {
                            setIsLoading(false)
                            queryClient.invalidateQueries({ queryKey: ['chats'] })
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error streaming response:', error)
            setIsLoading(false)
            setMessages((prev) => {
                const newMessages = [...prev]
                const lastMessage = newMessages[newMessages.length - 1]
                if (lastMessage.role === 'assistant' && !lastMessage.content) {
                    lastMessage.content = "Sorry, something went wrong. Please try again."
                }
                return newMessages
            })
        }
    }

    return (
        <div className="flex flex-col h-full relative">
            <ScrollArea className="flex-1">
                <div className="max-w-2xl mx-auto p-4 space-y-4 pb-4 w-full">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-32">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-full border border-primary/20">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="/ai-avatar.png" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">AI</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    How can I help you today?
                                </h2>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    Ask me anything, and I'll do my best to assist you.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <MessageList messages={messages} />
                    )}
                    {isLoading && (
                        <div className="flex gap-3 w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                            <div className="bg-muted/80 rounded-2xl px-4 py-3 border border-border/50">
                                <div className="flex items-center gap-1">
                                    <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="w-full z-10">
                <div className="max-w-2xl mx-auto">
                    <ChatInput onSend={handleSend} />
                    <div className="text-center mt-2">
                        <p className="text-xs text-muted-foreground">
                            AI can make mistakes. Please use with discretion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
