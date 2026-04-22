import { ClassificationResult } from "@/types/enem";
import { FALLBACK_CLASSIFICATION } from "@/mocks/competencies";

export async function classifyMessage(
  userMessage: string
): Promise<ClassificationResult> {
  try {
    const response = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error("Falha na classificação");

    return await response.json();
  } catch {
    return FALLBACK_CLASSIFICATION;
  }
}