import z from "zod";

export const FullUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string().or(z.date()),
  role: z.enum(["admin", "manager", "receptionist"]),
  avatar: z.string().or(z.instanceof(File)).optional(),
});

export const LoginSchema = FullUserSchema.pick({
  email: true,
  password: true,
});

export const SignupSchema = FullUserSchema.pick({
  email: true,
  password: true,
  name: true,
})
  .extend({
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UpdateUserSchema = FullUserSchema.pick({
  name: true,
  avatar: true,
}).partial();

export const UpdatePasswordSchema = FullUserSchema.pick({
  password: true,
})
  .extend({
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TFullUserSchema = z.infer<typeof FullUserSchema>;
export type TLoginType = z.infer<typeof LoginSchema>;
export type TSignupType = z.infer<typeof SignupSchema>;
export type TUpdateUserType = z.infer<typeof UpdateUserSchema>;
export type TUpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
