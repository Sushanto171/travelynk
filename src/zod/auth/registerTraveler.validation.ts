import z from "zod";

export const createTravelerValidation = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
  address: z.string().optional()
}).refine((data) => (data.password === data.confirmPassword), {
  error: "Do not match password",
  path: ["confirmPassword"]
})
