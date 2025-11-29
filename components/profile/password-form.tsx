"use client"

import type React from "react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordSchema, PasswordSchema } from "@/utils/schemas/password.schema"
import { useUpdatePassword } from "@/hooks/useUpdatePassword"

export function PasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  })

  function onSubmit(data: PasswordSchema) {
    updatePassword(data, {
      onSuccess: () => {
        reset()
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Update password</h2>
        <p className="text-sm text-muted-foreground">
          Ensure your account is using a long, random password to stay secure
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" placeholder="Current password" disabled={isPending} {...register("currentPassword")} />
          {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" placeholder="New password" disabled={isPending} {...register("newPassword")} />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm password" disabled={isPending} {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save password"}
        </Button>
      </form>
    </div>
  )
}
