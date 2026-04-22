import { Suggestion } from "@/types/chat";

export type QuestionOption = {
  label: string;
  value: string;
};

export type Question = {
  competencyCode: string;
  topic: string;
  content: string;
  options: QuestionOption[];
  correctValue: string; 
  explanation: string;
};

export const mockQuestions: Question[] = [
  // ── LC-C1 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C1",
    topic: "Uso da Vírgula",
    content: "Qual das alternativas usa a vírgula **corretamente**?",
    options: [
      { label: "A) O aluno, estudou muito.", value: "answer_wrong|A" },
      { label: "B) Estudei muito, porém não passei.", value: "answer_correct|B" },
      { label: "C) Ela comprou pão, e manteiga.", value: "answer_wrong|C" },
      { label: "D) Quando cheguei a aula havia começado.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|B",
    explanation: "A vírgula antes de conjunções adversativas como **'porém'** é obrigatória. As demais violam a regra SVC (nunca separe Sujeito-Verbo-Complemento).",
  },

  // ── LC-C2 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C2",
    topic: "Interpretação de Textos",
    content: "A palavra **'inferir'** em interpretação textual significa:",
    options: [
      { label: "A) Copiar informações do texto literalmente.", value: "answer_wrong|A" },
      { label: "B) Identificar o tema central do texto.", value: "answer_wrong|B" },
      { label: "C) Deduzir informações não ditas diretamente.", value: "answer_correct|C" },
      { label: "D) Resumir o texto em poucas palavras.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "**Inferir** é deduzir informações implícitas — o que está nas entrelinhas, mas não foi dito diretamente. É a habilidade mais cobrada nas questões de interpretação do ENEM.",
  },

  // ── LC-C4 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C4",
    topic: "Estrutura da Redação",
    content: "Qual é a função do **parágrafo de introdução** na redação dissertativo-argumentativa do ENEM?",
    options: [
      { label: "A) Apresentar os argumentos detalhados.", value: "answer_wrong|A" },
      { label: "B) Fazer a proposta de intervenção.", value: "answer_wrong|B" },
      { label: "C) Contextualizar o tema e apresentar a tese.", value: "answer_correct|C" },
      { label: "D) Concluir o raciocínio argumentativo.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "A introdução tem duas funções: **contextualizar** o tema (situá-lo no tempo, espaço ou debate social) e **apresentar a tese** (o ponto de vista que será defendido).",
  },

  // ── LC-C5 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C5",
    topic: "Proposta de Intervenção",
    content: "Para atingir nota máxima na Competência 5, a proposta de intervenção deve conter quantos elementos?",
    options: [
      { label: "A) 3 elementos", value: "answer_wrong|A" },
      { label: "B) 4 elementos", value: "answer_wrong|B" },
      { label: "C) 5 elementos", value: "answer_correct|C" },
      { label: "D) 2 elementos", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "São **5 elementos** obrigatórios: Agente + Ação + Meio/Modo + Efeito + Detalhamento. Sem todos os cinco, a nota fica abaixo de 200.",
  },

  // ── MT-C1 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C1",
    topic: "Porcentagem",
    content: "Um produto custa R$ 200,00 e sofre um desconto de 15%. Qual o valor final?",
    options: [
      { label: "A) R$ 30,00", value: "answer_wrong|A" },
      { label: "B) R$ 185,00", value: "answer_wrong|B" },
      { label: "C) R$ 170,00", value: "answer_correct|C" },
      { label: "D) R$ 215,00", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "Desconto de 15% → fator multiplicativo **0,85**. R$ 200 × 0,85 = **R$ 170,00**.",
  },

  // ── MT-C2 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C2",
    topic: "Equações do 1º Grau",
    content: "Resolva: **2X + 10 = 34**. Qual o valor de X?",
    options: [
      { label: "A) 10", value: "answer_wrong|A" },
      { label: "B) 12", value: "answer_correct|B" },
      { label: "C) 14", value: "answer_wrong|C" },
      { label: "D) 24", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|B",
    explanation: "2X = 34 - 10 → 2X = 24 → X = **12**.",
  },

  // ── MT-C3 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C3",
    topic: "Teorema de Pitágoras",
    content: "Um triângulo retângulo tem catetos de 6 cm e 8 cm. Qual é a hipotenusa?",
    options: [
      { label: "A) 12 cm", value: "answer_wrong|A" },
      { label: "B) 10 cm", value: "answer_correct|B" },
      { label: "C) 14 cm", value: "answer_wrong|C" },
      { label: "D) 7 cm", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|B",
    explanation: "6² + 8² = c² → 36 + 64 = 100 → c = **10 cm**. É um múltiplo da terna 3, 4, 5.",
  },

  // ── MT-C4 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C4",
    topic: "Probabilidade Básica",
    content: "Uma urna tem 3 bolas azuis e 7 vermelhas. Qual a probabilidade de retirar uma azul?",
    options: [
      { label: "A) 1/3", value: "answer_wrong|A" },
      { label: "B) 3/7", value: "answer_wrong|B" },
      { label: "C) 3/10", value: "answer_correct|C" },
      { label: "D) 7/10", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "P = 3 (azuis) / 10 (total) = **3/10 = 30%**.",
  },

  // ── CN-C1 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C1",
    topic: "Genética Mendeliana",
    content: "No cruzamento entre dois indivíduos **Dd × Dd**, qual a proporção fenotípica esperada na prole?",
    options: [
      { label: "A) 1 dominante : 1 recessivo", value: "answer_wrong|A" },
      { label: "B) 1 dominante : 3 recessivos", value: "answer_wrong|B" },
      { label: "C) 3 dominantes : 1 recessivo", value: "answer_correct|C" },
      { label: "D) Todos dominantes", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "Quadro de Punnett: DD, Dd, Dd, dd → **3 com fenótipo dominante : 1 com fenótipo recessivo**.",
  },

  // ── CN-C2 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C2",
    topic: "Leis de Newton",
    content: "O uso do cinto de segurança exemplifica qual Lei de Newton?",
    options: [
      { label: "A) 2ª Lei — Força e aceleração", value: "answer_wrong|A" },
      { label: "B) 3ª Lei — Ação e reação", value: "answer_wrong|B" },
      { label: "C) 1ª Lei — Inércia", value: "answer_correct|C" },
      { label: "D) Lei da Gravitação Universal", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "O cinto exemplifica a **1ª Lei (Inércia)**: o corpo tende a continuar em movimento mesmo quando o carro freia. O cinto age como a força externa que interrompe esse movimento.",
  },

  // ── CN-C3 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C3",
    topic: "Estequiometria",
    content: "Na reação **2H₂ + O₂ → 2H₂O**, quantas moles de água são produzidas a partir de 4 moles de H₂?",
    options: [
      { label: "A) 2 moles", value: "answer_wrong|A" },
      { label: "B) 6 moles", value: "answer_wrong|B" },
      { label: "C) 4 moles", value: "answer_correct|C" },
      { label: "D) 8 moles", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "Proporção 2H₂ : 2H₂O = 1:1. Logo, 4 mol de H₂ → **4 mol de H₂O**.",
  },

  // ── CH-C1 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C1",
    topic: "Era Vargas",
    content: "O DIP (Departamento de Imprensa e Propaganda) durante o Estado Novo tinha como principal função:",
    options: [
      { label: "A) Promover eleições livres e democráticas.", value: "answer_wrong|A" },
      { label: "B) Censurar a oposição e exaltar Vargas.", value: "answer_correct|B" },
      { label: "C) Garantir direitos trabalhistas aos operários.", value: "answer_wrong|C" },
      { label: "D) Administrar as indústrias de base.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|B",
    explanation: "O DIP era o braço de **propaganda e censura** do Estado Novo — controlava rádio, jornais e cinema para exaltar Vargas e suprimir vozes da oposição.",
  },

  // ── CH-C2 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C2",
    topic: "Urbanização Brasileira",
    content: "O intenso processo de urbanização brasileiro entre 1950-1980 foi impulsionado principalmente por:",
    options: [
      { label: "A) Reforma agrária que expulsou camponeses.", value: "answer_wrong|A" },
      { label: "B) Industrialização e êxodo rural.", value: "answer_correct|B" },
      { label: "C) Crescimento do setor primário nas cidades.", value: "answer_wrong|C" },
      { label: "D) Políticas de habitação popular do governo.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|B",
    explanation: "A **industrialização** criou empregos nas cidades, atraindo trabalhadores rurais — fenômeno chamado **êxodo rural**. O Brasil passou de majoritariamente rural para urbano nesse período.",
  },

  // ── CH-C3 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C3",
    topic: "Iluminismo",
    content: "A **separação dos poderes** em Executivo, Legislativo e Judiciário foi proposta por:",
    options: [
      { label: "A) Jean-Jacques Rousseau", value: "answer_wrong|A" },
      { label: "B) John Locke", value: "answer_wrong|B" },
      { label: "C) Montesquieu", value: "answer_correct|C" },
      { label: "D) Voltaire", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "**Montesquieu**, em 'O Espírito das Leis' (1748), propôs a tripartição dos poderes como forma de evitar o absolutismo e garantir a liberdade dos cidadãos.",
  },

  // ── CH-C4 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C4",
    topic: "Desigualdade Social",
    content: "Para **Karl Marx**, a principal causa da desigualdade social é:",
    options: [
      { label: "A) A diferença de status e prestígio entre grupos.", value: "answer_wrong|A" },
      { label: "B) A falta de coesão e solidariedade social.", value: "answer_wrong|B" },
      { label: "C) A propriedade privada dos meios de produção.", value: "answer_correct|C" },
      { label: "D) A divisão burocrática do Estado moderno.", value: "answer_wrong|D" },
    ],
    correctValue: "answer_correct|C",
    explanation: "Para Marx, a desigualdade nasce da **propriedade dos meios de produção**: quem os possui (burguesia) explora quem só tem a força de trabalho (proletariado) — gerando a luta de classes.",
  },
];

export const getQuestionSuggestions = (question: Question): Suggestion[] =>
  question.options.map((opt) => ({ label: opt.label, value: opt.value }));