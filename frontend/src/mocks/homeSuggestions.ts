export interface Suggestion {
  label: string;
  active: boolean;
}

export const HOME_SUGGESTIONS: Suggestion[] = [
  { label: "Simulado rápido", active: false },
  { label: "ENEM 2026", active: true },
  { label: "Quero passar em Medicina", active: false },
  { label: "Fórmulas de física", active: true },
  { label: "Gerar questão", active: false },
];