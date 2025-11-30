import * as React from "react"
import { Check, ChevronRight, Thermometer } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { models } from "@/constants/ai-models"

interface ModelSelectorProps {
    model: string
    setModel: (model: string) => void
    temperature: number
    setTemperature: (temp: number) => void
}

export function ModelSelector({ model, setModel, temperature, setTemperature }: ModelSelectorProps) {
    const groupedModels = models.reduce((acc, model) => {
        if (!acc[model.type]) {
            acc[model.type] = []
        }
        acc[model.type].push(model)
        return acc
    }, {} as Record<string, typeof models>)

    return (
        <div className="flex items-center gap-0">

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground px-2">
                        <Thermometer className="h-4 w-4" />
                        <span className="text-xs font-medium">{temperature}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="temperature">Temperature</Label>
                            <span className="w-12 rounded-md border border-transparent py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                {temperature}
                            </span>
                        </div>
                        <Slider
                            id="temperature"
                            max={1}
                            defaultValue={[temperature]}
                            step={0.1}
                            onValueChange={(value) => setTemperature(value[0])}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="Temperature"
                        />
                    </div>
                </PopoverContent>
            </Popover>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        className="h-8 justify-between text-xs font-medium text-muted-foreground hover:text-foreground px-2"
                    >
                        {model
                            ? models.find((framework) => framework.value === model)?.label
                            : "Select model..."}
                        <ChevronRight className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                    {Object.entries(groupedModels).map(([type, typeModels]) => (
                        <React.Fragment key={type}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                                {type}
                            </div>
                            {typeModels.map((framework) => (
                                <DropdownMenuItem
                                    key={framework.value}
                                    onClick={() => setModel(framework.value)}
                                    className="justify-between cursor-pointer"
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4",
                                            model === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </DropdownMenuItem>
                            ))}
                        </React.Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
