"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetProfile } from "@/hooks/useGetProfile"
import { useForm } from "react-hook-form"
import { ProfileSchema, profileSchema } from "@/utils/schemas/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateProfile } from "@/hooks/useUpdateProfile"

export function ProfileForm() {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data, isLoading: isProfileLoading } = useGetProfile();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data?.data?.name,
    },
  })


  async function onSubmit(data: ProfileSchema) {
    updateProfile(data);
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Profile information</h2>
        <p className="text-sm text-muted-foreground">Update your name and email address</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" defaultValue={data?.data?.name} disabled={isPending || isProfileLoading} {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" defaultValue={data?.data?.email} disabled={true} />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  )
}
