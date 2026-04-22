import { NextRequest, NextResponse } from "next/server";
import { enemCompetencies, FALLBACK_CLASSIFICATION } from "@/mocks/competencies";
import { ClassificationResult } from "@/types/enem";


function extractTopic(message: string, keywords: string[]): string {
  const lower = message.toLowerCase();

  const matched = keywords.find((kw) => lower.includes(kw));
  if (matched) {
    
    return matched.charAt(0).toUpperCase() + matched.slice(1);
  }

  
  const words = message.trim().split(" ").slice(0, 5).join(" ");
  return words.length > 0 ? words : "Tópico não identificado";
}

function classifyByKeywords(message: string): ClassificationResult {
  const lower = message.toLowerCase();

  let bestMatch: { competency: typeof enemCompetencies[0]; score: number } | null = null;

  for (const competency of enemCompetencies) {
    const score = competency.keywords.filter((kw) => lower.includes(kw)).length;

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { competency, score };
    }
  }

  if (!bestMatch) return FALLBACK_CLASSIFICATION;

  const { competency, score } = bestMatch;

  return {
    area: competency.area,
    subject: competency.subject,
    competencyCode: competency.code,
    topic: extractTopic(message, competency.keywords),
    confidence: score >= 3 ? "high" : score === 2 ? "medium" : "low",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(FALLBACK_CLASSIFICATION, { status: 200 });
    }

    
    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = classifyByKeywords(message);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(FALLBACK_CLASSIFICATION, { status: 200 });
  }
}