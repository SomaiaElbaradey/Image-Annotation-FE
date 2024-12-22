import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
    .extend({
        confirmation: z.string(),
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Passwords don't match",
        path: ["confirmation"],
    });

export type RegisterInputs = z.infer<typeof registerSchema>;
