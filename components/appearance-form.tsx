"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function AppearanceForm() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Appearance</h2>
        <p className="text-sm text-muted-foreground">Customize how the app looks on your device</p>
      </div>
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="grid grid-cols-3 gap-4">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-accent",
                theme === t && "border-primary bg-accent",
              )}
            >
              <div
                className={cn(
                  "h-12 w-full rounded-md border",
                  t === "light" && "bg-white",
                  t === "dark" && "bg-zinc-900",
                  t === "system" && "bg-gradient-to-r from-white to-zinc-900",
                )}
              />
              <span className="text-sm capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>
      <Button>Save preferences</Button>
    </div>
  )
}
