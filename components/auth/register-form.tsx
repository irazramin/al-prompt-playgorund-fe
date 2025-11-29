"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, RegistrationSchema } from "@/utils/schemas/registration.schema"
import { useRegister } from "@/hooks/useRegister"

export function RegisterForm() {
  const { mutate: registeration, isPending } = useRegister()
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(data: RegistrationSchema) {
    registeration(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="Enter your name" required disabled={isPending} {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" placeholder="name@example.com" required disabled={isPending} {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Create a password" required disabled={isPending} {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" type="password" placeholder="Confirm your password" required disabled={isPending} {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}
