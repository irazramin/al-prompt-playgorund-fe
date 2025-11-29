"use client"
import { useState, useEffect, useRef, KeyboardEvent } from "react"
import { SendHorizontal, Paperclip, Mic, Plus, Settings2, History } from "lucide-react"

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
    const [model, setModel] = useState("gpt-4")
    const [temperature, setTemperature] = useState(0.7)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const model = localStorage.getItem("model");
        const temperature = localStorage.getItem("temperature");
        if (model) {
            setModel(model)
        }
        if (temperature) {
            setTemperature(parseFloat(temperature))
        }
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto" // Reset height
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

    const handleModelChange = (model: string) => {
        if (model) {
            setModel(model)
            localStorage.setItem("model", model)
        }
    }

    const handleTemperatureChange = (temperature: number) => {
        if (temperature) {
            setTemperature(temperature)
            localStorage.setItem("temperature", temperature.toString())
        }
    }

    return (
        <div className="relative flex flex-col w-full max-w-2xl mx-auto border rounded-2xl bg-muted/40 focus-within:bg-background  transition-colors">
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
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted">
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add Attachment</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                    <ModelSelector
                        model={model}
                        setModel={handleModelChange}
                        temperature={temperature}
                        setTemperature={handleTemperatureChange}
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
