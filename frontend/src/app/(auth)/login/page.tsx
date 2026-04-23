import AuthForm from "@/components/features/auth/AuthForm";

export default function LoginPage() {
  return (
    <main
      className="
        min-h-screen bg-neutras-900 font-poppins text-neutras-50
        relative overflow-hidden flex items-center justify-center antialiased
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_50%_50%,var(--primary-900)_0%,transparent_70%)]
        before:opacity-50
      "
    >
      <div className="relative z-10 w-full max-w-xl px-6 py-10">
        <div className="rounded-[2.5rem] border border-neutras-800 bg-neutras-900/80 p-8 shadow-2xl backdrop-blur-xl">
          
        
          <AuthForm />
          
        </div>
      </div>
    </main>
  );
}