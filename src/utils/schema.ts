import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(5).email().toLowerCase().trim(),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export type LoginType = z.infer<typeof LoginSchema>;