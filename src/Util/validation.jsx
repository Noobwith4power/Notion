import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "incorect email" }),
  password: z
    .string()
    .min(8, "Password must contain at least 8 symbols")
    .regex(/^(?=.*[0-9])/, "Пароль должен содержать цифру")
    .regex(/^(?=.*[A-Z])/, "Пароль должен содержать заглавную букву")
    .regex(/^(?=.*[a-z])/, "Пароль должен содержать прописную букву"),
});
