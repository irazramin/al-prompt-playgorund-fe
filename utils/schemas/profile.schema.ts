import { z } from "zod"

export const profileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
})

export type ProfileSchema = z.infer<typeof profileSchema>