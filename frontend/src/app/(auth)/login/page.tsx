  "use client";

  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import { useAuthStore } from "@/store/useAuthStore";
  import { createStudent } from "@/lib/services/alunos"; 

  export default function LoginPage() {
    const router = useRouter();
    const { register, login } = useAuthStore();

    const [role, setRole] = useState<"aluno" | "professor">("aluno");
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");

    const handleRoleChange = (newRole: "aluno" | "professor") => {
      setRole(newRole);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSubject("");
      setError("");
    };

    const handleAuth = async (e: React.FormEvent) => {
      e.preventDefault(); 
      setError("");

      if (isCreatingAccount) {
        if (!name.trim()) { setError("Digite seu nome completo."); return; }
        if (!email.trim()) { setError("Digite seu e-mail."); return; }
        if (role === "professor" && !subject) { setError("Selecione sua disciplina."); return; }
        if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres."); return; }
        if (password !== confirmPassword) { setError("As senhas não coincidem."); return; }

        if (role === "aluno") {
          try {
            await createStudent({ name, email });
          } catch (err) {
            console.error("Erro ao salvar aluno na API:", err);
          }
        }

        const success = register({
          name,
          email,
          role,
          subject: role === "professor" ? subject : undefined,
        });

        if (!success) { setError("Este e-mail já está cadastrado."); return; }

        router.push(role === "aluno" ? "/Aluno" : "/Professor");

      } else {
        if (!email.trim()) { setError("Digite seu e-mail."); return; }

        const loggedUser = login(email);

        if (loggedUser) {
          router.push(loggedUser.role === "aluno" ? "/Aluno" : "/Professor");
        } else {
          setError("Nenhuma conta encontrada com este e-mail.");
        }
      }
    };

    const inputClass = `
      w-full rounded-xl border border-neutras-700 bg-neutras-800
      px-4 py-3 text-body-default text-neutras-50
      placeholder:text-neutras-500
      outline-none focus:border-primaria focus:ring-1 focus:ring-primaria
      transition-all
    `;

    return (
      <main className="
        min-h-screen bg-neutras-900 font-poppins text-neutras-50
        relative overflow-hidden flex items-center justify-center antialiased
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_50%_50%,var(--primary-900)_0%,transparent_70%)]
        before:opacity-50
      ">
        <div className="relative z-10 w-full max-w-xl px-6 py-10">
          <div className="rounded-[2.5rem] border border-neutras-800 bg-neutras-900/80 p-8 shadow-2xl backdrop-blur-xl">

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
                <button
                  type="button"
                  onClick={() => handleRoleChange("aluno")}
                  className={`flex-1 py-2.5 text-body-small font-semibold rounded-full transition-all duration-300 z-10 ${
                    role === "aluno" ? "text-neutras-50" : "text-neutras-400 hover:text-neutras-200"
                  }`}
                >
                  Sou Aluno
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("professor")}
                  className={`flex-1 py-2.5 text-body-small font-semibold rounded-full transition-all duration-300 z-10 ${
                    role === "professor" ? "text-neutras-50" : "text-neutras-400 hover:text-neutras-200"
                  }`}
                >
                  Sou Monitor
                </button>
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primaria rounded-full transition-all duration-300 ease-in-out ${
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

              <form onSubmit={handleAuth} className="mx-auto max-w-sm space-y-3 mt-6">
                {isCreatingAccount && (
                  <>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome completo"
                      autoComplete="name"
                      className={inputClass}
                    />
                    {role === "professor" && (
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={`${inputClass} appearance-none ${
                          subject ? "text-neutras-50" : "text-neutras-500"
                        }`}
                      >
                        <option value="" disabled>Selecione sua disciplina</option>
                        <option value="physics">Física</option>
                        <option value="biology">Biologia</option>
                        <option value="math">Matemática</option>
                        <option value="chemistry">Química</option>
                      </select>
                    )}
                  </>
                )}

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  autoComplete="email"
                  className={inputClass}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  autoComplete={isCreatingAccount ? "new-password" : "current-password"}
                  className={inputClass}
                />
                {isCreatingAccount && (
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar senha"
                    autoComplete="new-password"
                    className={inputClass}
                  />
                )}

                {error && (
                  <p className="text-erro text-body-small text-center pt-1">
                    {error}
                  </p>
                )}

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primaria px-4 py-3 text-body-small font-semibold text-neutras-50 transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    {isCreatingAccount ? "Criar minha conta" : "Entrar"}
                  </button>

                </div>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsCreatingAccount(!isCreatingAccount); setError(""); }}
                  className="text-body-small text-neutras-400 hover:text-secundaria transition-colors"
                >
                  {isCreatingAccount ? "Já tem conta? Faça login" : "Não tem conta? Crie uma"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }


