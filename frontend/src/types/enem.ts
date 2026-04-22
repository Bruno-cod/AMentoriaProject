export type ENEMArea =
  | "linguagens"
  | "matematica"
  | "natureza"
  | "humanas";

export type ENEMSubject =
  | "portugues" | "literatura" | "redacao"
  | "matematica"
  | "fisica" | "quimica" | "biologia"
  | "historia" | "geografia" | "filosofia" | "sociologia";

export type ClassificationResult = {
  area: ENEMArea;
  subject: ENEMSubject;
  competencyCode: string;
  topic: string;
  confidence: "high" | "medium" | "low";
};  