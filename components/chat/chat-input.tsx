import { useState, useEffect, useRef, KeyboardEvent } from "react"
import { useAI } from "@/components/context/ai-context"
import { SendHorizontal, Sparkles, Loader2 } from "lucide-react"
import { models } from "@/constants/ai-models"
import { useEnhancePrompt } from "@/hooks/useEnhancePrompt"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ModelSelector } from "@/components/chat/model-selector"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatInputProps {
    onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("")
    const { model, setModel, temperature, setTemperature } = useAI()
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { mutate: enhance, isPending: isEnhancing, data: enhanceData } = useEnhancePrompt()

    useEffect(() => {
        if (enhanceData?.data?.enhancedPrompt) {
            setInput(enhanceData.data.enhancedPrompt)
        }
    }, [enhanceData])

    const handleEnhance = async () => {
        if (!input.trim()) return

        const selectedModel = models.find(m => m.value === model)
        const provider = selectedModel?.type || "openai"

        enhance({
            prompt: input,
            provider,
            aiModel: model,
            temperature
        })
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            const scrollHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`
        }
    }, [input])

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (input.trim()) {
                onSend(input)
                setInput("")
                if (textareaRef.current) {
                    textareaRef.current.style.height = "60px"
                }
            }
        }
    }

    return (
        <div className="relative flex flex-col w-full max-w-3xl mx-auto border rounded-2xl bg-muted/40 focus-within:bg-background  transition-colors">
            <Textarea
                ref={textareaRef}
                placeholder="How can I help you today?"
                className="min-h-[60px] w-full resize-none border-0 bg-transparent px-4 py-3 focus-visible:ring-0 shadow-none text-base overflow-y-auto max-h-[200px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
            />
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted"
                                    onClick={handleEnhance}
                                    disabled={isEnhancing || !input.trim()}
                                >
                                    {isEnhancing ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Sparkles className="h-5 w-5" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Enhance Prompt</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                    <ModelSelector
                        model={model}
                        setModel={setModel}
                        temperature={temperature}
                        setTemperature={setTemperature}
                    />
                    <Button
                        size="icon"
                        className="h-8 w-8 rounded-lg transition-all"
                        disabled={!input.trim()}
                        onClick={() => {
                            if (input.trim()) {
                                onSend(input)
                                setInput("")
                            }
                        }}
                    >
                        <SendHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
