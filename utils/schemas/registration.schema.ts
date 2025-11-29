import z from "zod";

export const registrationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>