import z from "zod";

export const FullUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string().or(z.date()),
  role: z.enum(["admin", "manager", "receptionist"]),
});

export const LoginSchema = FullUserSchema.pick({
  email: true,
  password: true,
});

export type TFullUserSchema = z.infer<typeof FullUserSchema>;
export type TLoginType = z.infer<typeof LoginSchema>;
