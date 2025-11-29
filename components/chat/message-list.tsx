"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface MessageListProps {
    messages: Message[]
}

function MessageActions({ content }: { content: string }) {
    const [isCopied, setIsCopied] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="flex items-center gap-1 mt-2">
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
            >
                {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="sr-only">Copy</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="sr-only">Regenerate</span>
            </Button>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="sr-only">Good response</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span className="sr-only">Bad response</span>
                </Button>
            </div>
        </div>
    )
}

export function MessageList({ messages }: MessageListProps) {
    const bottomRef = React.useRef<HTMLDivElement>(null)

    // Scroll to bottom when messages change
    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    if (messages.length === 0) return null

    return (
        <div className="flex flex-col gap-6 py-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={cn(
                        "flex gap-3 w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
                        "justify-start"
                    )}
                >
                    {/* Avatar */}
                    {message.role === "assistant" ? (
                        <Avatar className="h-8 w-8 border-2 border-border/50 shadow-sm">
                            <AvatarImage src="/ai-avatar.png" />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">AI</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar className="h-8 w-8 border-2 border-primary/20 shadow-sm">
                            <AvatarImage src="/user-avatar.png" />
                            <AvatarFallback className="bg-primary/90 text-primary-foreground font-semibold text-xs">U</AvatarFallback>
                        </Avatar>
                    )}

                    <div className="flex flex-col max-w-[75%]">
                        {/* Message bubble */}
                        <div
                            className={cn(
                                "rounded-2xl p-2 break-words",
                                message.role === "user"
                                    ? "bg-neutral-200 text-black"
                                    : "bg-transparent text-foreground p-0"
                            )}
                        >
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Actions for AI messages */}
                        {message.role === "assistant" && (
                            <MessageActions content={message.content} />
                        )}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    )
}
