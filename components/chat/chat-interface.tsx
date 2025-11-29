"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChatInput } from "@/components/chat/chat-input"
import { MessageList } from "@/components/chat/message-list"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    const [messages, setMessages] = React.useState<Message[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const initialized = React.useRef(false)

    // Handle initial message from URL
    React.useEffect(() => {
        if (!initialized.current && id) {
            const q = searchParams.get("q")
            if (q) {
                initialized.current = true
                // Add initial message immediately
                const userMessage: Message = { role: "user", content: q }
                setMessages([userMessage])
                setIsLoading(true)

                // Simulate AI response
                setTimeout(() => {
                    const aiMessage: Message = {
                        role: "assistant",
                        content: "This is a simulated AI response. I am currently a frontend demo, but I can be connected to a real backend API to provide actual answers."
                    }
                    setMessages((prev) => [...prev, aiMessage])
                    setIsLoading(false)

                    // Clean up URL without reload
                    window.history.replaceState(null, "", `/chat/${id}`)
                }, 1000)
            }
        }
    }, [id, searchParams])

    const handleSend = async (content: string) => {
        if (!id) {
            // Generate random ID and redirect
            const newId = Math.random().toString(36).substring(7)
            router.push(`/chat/${newId}?q=${encodeURIComponent(content)}`)
            return
        }

        const userMessage: Message = { role: "user", content }
        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                role: "assistant",
                content: "This is a simulated AI response. I am currently a frontend demo, but I can be connected to a real backend API to provide actual answers."
            }
            setMessages((prev) => [...prev, aiMessage])
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="flex flex-col h-full relative">
            <ScrollArea className="flex-1">
                <div className="max-w-3xl mx-auto p-4 space-y-4 pb-4">
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
                            <Avatar className="h-8 w-8 border-2 border-border/50">
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">AI</AvatarFallback>
                            </Avatar>
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
            <div className="w-full p-4 bg-background z-10">
                <div className="max-w-3xl mx-auto">
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
