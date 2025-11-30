"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { models } from "@/constants/ai-models"

interface AIContextType {
    model: string
    setModel: (model: string) => void
    temperature: number
    setTemperature: (temp: number) => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
    const [model, setModel] = useState("gemini-2.5-flash-preview-09-2025")
    const [temperature, setTemperature] = useState(0.7)

    useEffect(() => {
        const savedModelData = localStorage.getItem("modelData")
        const savedTemperature = localStorage.getItem("temperature")

        if (savedModelData) {
            try {
                const modelData = JSON.parse(savedModelData)
                setModel(modelData.value)
            } catch (e) {
                console.error("Failed to parse model data from localStorage", e)
            }
        }
        if (savedTemperature) {
            setTemperature(parseFloat(savedTemperature))
        }
    }, [])

    const handleSetModel = (newModel: string) => {
        setModel(newModel)
        const modelData = models.find(m => m.value === newModel)
        if (modelData) {
            localStorage.setItem("modelData", JSON.stringify(modelData))
        }
    }

    const handleSetTemperature = (newTemperature: number) => {
        setTemperature(newTemperature)
        localStorage.setItem("temperature", newTemperature.toString())
    }

    return (
        <AIContext.Provider
            value={{
                model,
                setModel: handleSetModel,
                temperature,
                setTemperature: handleSetTemperature,
            }}
        >
            {children}
        </AIContext.Provider>
    )
}

export function useAI() {
    const context = useContext(AIContext)
    if (context === undefined) {
        throw new Error("useAI must be used within an AIProvider")
    }
    return context
}
