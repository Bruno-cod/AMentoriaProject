import { z } from "zod";

export const authSchema = z.object({
  isCreatingAccount: z.boolean(),
  role: z.enum(["aluno", "professor"]),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
  subject: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isCreatingAccount) {
    if (!data.name || data.name.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Digite seu nome completo.", path: ["name"] });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "As senhas não coincidem.", path: ["confirmPassword"] });
    }
    if (data.role === "professor" && (!data.subject || data.subject === "")) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selecione sua disciplina.", path: ["subject"] });
    }
  }
});

export type AuthFormValues = z.infer<typeof authSchema>;