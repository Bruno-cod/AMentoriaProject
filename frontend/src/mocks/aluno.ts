import { Student } from "@/types/student"

export const mockAlunos: Student[] = [
  { id: 1, name: "Ana Beatriz", email: "ana.beatriz@email.com", lastInteraction: "Hoje, 14:32" },
  { id: 2, name: "Carlos Eduardo", email: "cadu.edu@email.com", lastInteraction: "Hoje, 09:15" },
  { id: 3, name: "Fernanda Lima", email: "nanda.lima@email.com", lastInteraction: "Ontem, 18:40" },
  { id: 4, name: "João Pedro", email: "jp.silva@email.com", lastInteraction: "22/10/2023" },
  { id: 5, name: "Mariana Costa", email: "mari.costa@email.com", lastInteraction: "20/10/2023" },
];

export const mockFiles = [
  { id: "1", name: "Apostila_Matematica_Basica.pdf", size: "2.4 MB", uploadDate: "10/04/2026" },
  { id: "2", name: "Exercicios_Equacoes.docx", size: "1.1 MB", uploadDate: "08/04/2026" },
  { id: "3", name: "Gabarito_Semana_1.pdf", size: "800 KB", uploadDate: "05/04/2026" },
];
