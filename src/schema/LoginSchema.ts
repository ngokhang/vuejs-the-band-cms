import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const loginFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, "Username phải có ít nhất 2 ký tự")
      .max(50, "Username không được vượt quá 50 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(50),
    rememberMe: z.boolean().optional(),
  }),
);
