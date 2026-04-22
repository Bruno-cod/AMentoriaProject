export type Suggestion = {
  label: string;
  value: string;
};

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  image?: string | null;
  suggestions?: Suggestion[];
  tipLevel?: number;
  rating?: "up" | "down";
  feedbackText?: string;
};

export interface ChatHistoryData {
  id: string;
  alunoEmail?: string;
  topic: string;
  date: string;
  messages: Message[];
  isFinished: boolean;
}