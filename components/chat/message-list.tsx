"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
                        "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ",
                        message.role === "user" ? "flex-row-reverse" : ""
                    )}
                >
                    {/* Avatar */}
                    {message.role === "assistant" ? (
                        // <Avatar className="h-8 w-8 border-2 border-border/50 shadow-sm">
                        //     <AvatarImage src="/ai-avatar.png" />
                        //     <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">AI</AvatarFallback>
                        // </Avatar>
                        <></>
                    ) : (
                        <Avatar className="h-8 w-8 border-2 border-primary/20 shadow-sm">
                            <AvatarImage src="/user-avatar.png" />
                            <AvatarFallback className="bg-primary/90 text-primary-foreground font-semibold text-xs">U</AvatarFallback>
                        </Avatar>
                    )}

                    <div className={cn(
                        "flex flex-col",
                        message.role === "user" ? "items-end" : "items-start"
                    )}>
                        <div
                            className={cn(
                                "rounded-xl py-2 px-3 break-words",
                                message.role === "user"
                                    ? "bg-neutral-200 text-black"
                                    : "bg-transparent text-foreground p-0 w-full"
                            )}
                        >
                            <div className="text-sm leading-relaxed inline-block">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <div className="relative rounded-md overflow-hidden my-2">
                                                    <div className="absolute right-2 top-2 z-10">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-white hover:text-white bg-gray-500 backdrop-blur-sm hover:bg-gray-900 cursor-pointer"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
                                                            }}
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                            <span className="sr-only">Copy code</span>
                                                        </Button>
                                                    </div>
                                                    <SyntaxHighlighter
                                                        {...props}
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code {...props} className={cn("bg-muted px-1 py-0.5 rounded-md font-mono text-sm", className)}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
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
