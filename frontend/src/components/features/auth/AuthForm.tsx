"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { registerUser, loginUser } from "@/lib/services/auth";
import { createStudent } from "@/lib/services/alunos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { authSchema, type AuthFormValues } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/Auth/useAuth"

export default function AuthForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
   const {user} = useAuth();

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (user) {
      router.push(user.role === "aluno" ? "/Aluno" : "/Professor");
    }
  }, [user, router]);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      isCreatingAccount: false,
      role: "aluno",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      subject: "",
    },
  });

  const isCreatingAccount = form.watch("isCreatingAccount");
  const role = form.watch("role");

  const onSubmit = async (values: AuthFormValues) => {
    setApiError("");

    try {
      if (values.isCreatingAccount) {
        const response = await registerUser({
          name: values.name || "",
          email: values.email,
          password: values.password,
          role: values.role,
          subject: values.role === "professor" ? values.subject : undefined,
        });

        const { access_token, token, ...userData } = response as any;
        const tokenReal = access_token || token;

        if (tokenReal) {
          localStorage.setItem("token", tokenReal);
        }

        if (values.role === "aluno") {
          try {
            await createStudent({
              name: values.name || "",
              email: values.email,
            });
          } catch (studentErr) {
            console.error(
              "Aviso: Falha ao sincronizar tabela de alunos:",
              studentErr,
            );
          }
        }

        setUser(userData);
        router.push(userData.role === "aluno" ? "/Aluno" : "/Professor");
      } else {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });

        const { access_token, token, ...userData } = response as any;
        const tokenReal = access_token || token;

        if (tokenReal) {
          localStorage.setItem("token", tokenReal);
        }

        setUser(userData);
        router.push(userData.role === "aluno" ? "/Aluno" : "/Professor");
      }
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Erro ao conectar com o servidor.",
      );
    }
  };

  const inputClass = `
    w-full rounded-xl border border-neutras-700 bg-neutras-800
    px-4 h-12 text-body-default text-neutras-50
    placeholder:text-neutras-500
    outline-none focus:border-primaria focus:ring-1 focus:ring-primaria
    transition-all
  `;

  return (
    <>
      <div className="mb-8 flex items-center justify-between rounded-3xl bg-neutras-800 px-6 py-5 border border-neutras-700">
        <div>
          <h2 className="text-h4 font-semibold text-neutras-50 leading-none">
            amentor<span className="text-secundaria">IA</span>.
          </h2>
          <p className="text-caption text-neutras-400 mt-1">
            Acesso {role === "aluno" ? "Aluno" : "Monitor"}
          </p>
        </div>
        <Link
          href="/"
          className="text-body-small font-semibold text-secundaria hover:opacity-80 transition-opacity"
        >
          Voltar
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex bg-neutras-800 p-1 rounded-full border border-neutras-700 w-full max-w-xs mx-auto relative">
          <Button
            type="button"
            variant="ghost"
            size="none"
            onClick={() => {
              form.setValue("role", "aluno");
              form.clearErrors();
            }}
            className={`flex-1 py-2.5 text-body-small font-semibold rounded-full transition-all duration-300 z-10 hover:scale-100 ${
              role === "aluno"
                ? "text-neutras-50 hover:text-neutras-50"
                : "text-neutras-400 hover:text-neutras-200 hover:bg-transparent"
            }`}
          >
            Sou Aluno
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="none"
            onClick={() => {
              form.setValue("role", "professor");
              form.clearErrors();
            }}
            className={`flex-1 py-2.5 text-body-small font-semibold rounded-full transition-all duration-300 z-10 hover:scale-100 ${
              role === "professor"
                ? "text-neutras-50 hover:text-neutras-50"
                : "text-neutras-400 hover:text-neutras-200 hover:bg-transparent"
            }`}
          >
            Sou Monitor
          </Button>
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primaria rounded-full transition-all duration-300 ease-in-out pointer-events-none ${
              role === "aluno" ? "left-1" : "left-[calc(50%+2px)]"
            }`}
          />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-h2 font-bold text-neutras-50">
            {isCreatingAccount ? "Criar conta" : "Fazer login"}
          </h1>
          <p className="text-body-small text-neutras-400 h-5 transition-all">
            {role === "aluno"
              ? "Pronto para gabaritar o ENEM?"
              : "Vamos transformar a educação hoje?"}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-sm space-y-3 mt-6"
          >
            {isCreatingAccount && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome completo"
                          autoComplete="name"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-erro text-xs ml-1" />
                    </FormItem>
                  )}
                />

                {role === "professor" && (
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <select
                            className={`${inputClass} appearance-none ${
                              field.value
                                ? "text-neutras-50"
                                : "text-neutras-500"
                            }`}
                            {...field}
                          >
                            <option value="" disabled>
                              Selecione sua disciplina
                            </option>
                            <option value="physics">Física</option>
                            <option value="biology">Biologia</option>
                            <option value="math">Matemática</option>
                            <option value="chemistry">Química</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-erro text-xs ml-1" />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      autoComplete="email"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-erro text-xs ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Senha"
                      autoComplete={
                        isCreatingAccount ? "new-password" : "current-password"
                      }
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-erro text-xs ml-1" />
                </FormItem>
              )}
            />

            {isCreatingAccount && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmar senha"
                        autoComplete="new-password"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-erro text-xs ml-1" />
                  </FormItem>
                )}
              />
            )}

            {apiError && (
              <p className="text-erro text-body-small text-center pt-1 font-medium">
                {apiError}
              </p>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full rounded-xl text-body-small h-12 hover:opacity-90 active:scale-[0.98]"
              >
                {isCreatingAccount ? "Criar minha conta" : "Entrar"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="none"
            type="button"
            onClick={() => {
              form.setValue("isCreatingAccount", !isCreatingAccount);
              form.clearErrors();
              setApiError("");
            }}
            className="text-body-small text-neutras-400 hover:text-secundaria hover:bg-transparent hover:scale-100"
          >
            {isCreatingAccount
              ? "Já tem conta? Faça login"
              : "Não tem conta? Crie uma"}
          </Button>
        </div>
      </div>
    </>
  );
}
