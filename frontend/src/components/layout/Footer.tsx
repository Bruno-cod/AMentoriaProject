export function Footer() {
  return (
    <footer className="w-full h-12 flex items-center justify-around bg-secundaria px-10 mt-auto">
      <p className="text-body-small text-neutras-900 font-medium">
        Todos os Direitos Reservados 2026 | AMentoria Educação
      </p>
      <a
        className="text-body-small text-neutras-900 underline font-medium hover:text-primary-800 transition-colors"
        href="https://amentoriaenem.com.br/politica-de-privacidade/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Política de Privacidade
      </a>
    </footer>
  );
}