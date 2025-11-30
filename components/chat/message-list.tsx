"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
                        "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 will-change-auto",
                        message.role === "user" ? "flex-row-reverse" : ""
                    )}
                >
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

                    <div className={cn(
                        "flex flex-col flex-1 min-w-0",
                        message.role === "user" ? "items-end" : "items-start"
                    )}>
                        <div
                            className={cn(
                                "rounded-b-lg rounded-tl-lg py-1 px-3 wrap-break-word max-w-full",
                                message.role === "user"
                                    ? "bg-neutral-100 text-black"
                                    : "bg-transparent text-foreground p-0 w-full"
                            )}
                        >
                            <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed w-full *:mb-2 *:last:mb-0">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ children }) => <p className="mb-2 last:mb-0 whitespace-pre-wrap wrap-break-word">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="wrap-break-word">{children}</li>,
                                        h1: ({ children }) => <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-2 first:mt-0">{children}</h3>,
                                        blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">{children}</blockquote>,
                                        table: ({ children }) => <div className="overflow-x-auto my-2"><table className="min-w-full border-collapse border border-gray-300">{children}</table></div>,
                                        th: ({ children }) => <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">{children}</th>,
                                        td: ({ children }) => <td className="border border-gray-300 px-4 py-2">{children}</td>,
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
                                                        style={coldarkDark}
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
