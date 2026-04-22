import { ENEMArea, ENEMSubject } from "@/types/enem";

export type ENEMCompetency = {
  code: string;
  area: ENEMArea;
  subject: ENEMSubject;
  label: string;
  keywords: string[]; 
};

export const enemCompetencies: ENEMCompetency[] = [
  // ── Linguagens ───────────────────────────────────────────
  {
    code: "LC-C1",
    area: "linguagens",
    subject: "portugues",
    label: "Uso da língua padrão",
    keywords: ["vírgula", "concordância", "ortografia", "gramática", "sujeito", "verbo", "pontuação", "crase", "acento"],
  },
  {
    code: "LC-C2",
    area: "linguagens",
    subject: "portugues",
    label: "Interpretação de textos",
    keywords: ["interpretação", "texto", "leitura", "inferência", "implícito", "explícito", "gênero textual"],
  },
  {
    code: "LC-C3",
    area: "linguagens",
    subject: "literatura",
    label: "Literatura brasileira",
    keywords: ["literatura", "romantismo", "modernismo", "realismo", "poesia", "conto", "romance", "autor", "obra"],
  },
  {
    code: "LC-C4",
    area: "linguagens",
    subject: "redacao",
    label: "Redação — Estrutura",
    keywords: ["redação", "dissertação", "introdução", "desenvolvimento", "conclusão", "parágrafo", "tese", "argumento"],
  },
  {
    code: "LC-C5",
    area: "linguagens",
    subject: "redacao",
    label: "Redação — Proposta de Intervenção",
    keywords: ["proposta", "intervenção", "competência 5", "agente", "ação", "efeito", "detalhamento", "solução"],
  },

  // ── Matemática ───────────────────────────────────────────
  {
    code: "MT-C1",
    area: "matematica",
    subject: "matematica",
    label: "Números e operações",
    keywords: ["fração", "porcentagem", "razão", "proporção", "mmc", "mdc", "número", "decimal", "inteiro"],
  },
  {
    code: "MT-C2",
    area: "matematica",
    subject: "matematica",
    label: "Álgebra e equações",
    keywords: ["equação", "inequação", "álgebra", "variável", "função", "polinômio", "sistema", "expressão"],
  },
  {
    code: "MT-C3",
    area: "matematica",
    subject: "matematica",
    label: "Geometria",
    keywords: ["geometria", "área", "volume", "perímetro", "triângulo", "círculo", "ângulo", "pitágoras", "semelhança"],
  },
  {
    code: "MT-C4",
    area: "matematica",
    subject: "matematica",
    label: "Probabilidade e Estatística",
    keywords: ["probabilidade", "estatística", "média", "moda", "mediana", "combinação", "arranjo", "permutação", "gráfico"],
  },

  // ── Ciências da Natureza ─────────────────────────────────
  {
    code: "CN-C1",
    area: "natureza",
    subject: "biologia",
    label: "Vida e evolução",
    keywords: ["célula", "dna", "evolução", "ecologia", "genética", "vírus", "bactéria", "fotossíntese", "respiração", "bioma"],
  },
  {
    code: "CN-C2",
    area: "natureza",
    subject: "fisica",
    label: "Matéria e energia",
    keywords: ["física", "força", "energia", "movimento", "eletricidade", "óptica", "termodinâmica", "ondas", "cinemática", "newton"],
  },
  {
    code: "CN-C3",
    area: "natureza",
    subject: "quimica",
    label: "Transformações químicas",
    keywords: ["química", "reação", "mol", "estequiometria", "ácido", "base", "tabela periódica", "ligação", "solução", "balancear"],
  },

  // ── Ciências Humanas ─────────────────────────────────────
  {
    code: "CH-C1",
    area: "humanas",
    subject: "historia",
    label: "História do Brasil e do Mundo",
    keywords: ["história", "guerra", "revolução", "vargas", "república", "império", "ditadura", "colonização", "independência"],
  },
  {
    code: "CH-C2",
    area: "humanas",
    subject: "geografia",
    label: "Espaço e território",
    keywords: ["geografia", "clima", "relevo", "população", "urbanização", "bioma", "mapa", "território", "globalização"],
  },
  {
    code: "CH-C3",
    area: "humanas",
    subject: "filosofia",
    label: "Ética e pensamento filosófico",
    keywords: ["filosofia", "ética", "platão", "aristóteles", "iluminismo", "contrato social", "moral", "política", "kant"],
  },
  {
    code: "CH-C4",
    area: "humanas",
    subject: "sociologia",
    label: "Sociedade e movimentos sociais",
    keywords: ["sociologia", "cultura", "sociedade", "movimento social", "desigualdade", "classe", "weber", "durkheim", "marx"],
  },
];


export const FALLBACK_CLASSIFICATION = {
  area: "matematica" as const,
  subject: "matematica" as const,
  competencyCode: "MT-C1",
  topic: "Tópico não identificado",
  confidence: "low" as const,
};