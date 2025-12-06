import z from "zod";

export const loginValidationZodSchema = z.object({
  email: z.email(),
  password: z
    .string("Password is required.")
    .trim()
    .min(6, "Password must be at least 6 character or long"),
});
