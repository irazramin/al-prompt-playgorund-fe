"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function TwoFactorForm() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Two-factor authentication</h2>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="2fa">Enable two-factor authentication</Label>
          <p className="text-sm text-muted-foreground">Receive a verification code via authenticator app</p>
        </div>
        <Switch id="2fa" checked={isEnabled} onCheckedChange={setIsEnabled} />
      </div>
      {isEnabled && (
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Scan the QR code with your authenticator app to set up two-factor authentication.
          </p>
          <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-md border bg-muted">
            <span className="text-xs text-muted-foreground">QR Code</span>
          </div>
          <Button className="mt-4">Verify and enable</Button>
        </div>
      )}
    </div>
  )
}
