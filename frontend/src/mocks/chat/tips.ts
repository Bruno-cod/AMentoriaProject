import { Suggestion } from "@/types/chat";

export type Tip = {
  level: 1 | 2 | 3;
  content: string;
};

export type TipSet = {
  competencyCode: string;
  topic: string;
  tips: [Tip, Tip, Tip];
  finalAnswer: string;
};

export const mockTipSets: TipSet[] = [
  // ── LC-C1 — Uso da língua padrão ────────────────────────
  {
    competencyCode: "LC-C1",
    topic: "Uso da Vírgula",
    tips: [
      { level: 1, content: "**Dica #1:** A regra mais cobrada no ENEM é nunca separar o Sujeito do Verbo com vírgula.\n\n❌ 'O aluno, estudou muito.'\n✅ 'O aluno estudou muito.'" },
      { level: 2, content: "**Dica #2:** Conjunções adversativas como **porém**, **contudo** e **todavia** exigem vírgula antes delas quando usadas no meio da frase.\n\n✅ 'Estudei muito, porém não passei.'" },
      { level: 3, content: "**Dica #3 (Última):** Orações adverbiais que vêm **antes** da oração principal sempre pedem vírgula.\n\n✅ 'Quando cheguei, a aula havia começado.'" },
    ],
    finalAnswer: "A vírgula antes do **'porém'** é obrigatória quando conecta duas orações. A regra do SVC (nunca separar Sujeito-Verbo-Complemento) elimina 80% dos erros de pontuação no ENEM.",
  },
  {
    competencyCode: "LC-C2",
    topic: "Interpretação de Textos",
    tips: [
      { level: 1, content: "**Dica #1:** Antes de responder, identifique o **tema central** do texto. Pergunte-se: 'Sobre o que o autor está falando?'" },
      { level: 2, content: "**Dica #2:** Diferencie o que está **explícito** (dito diretamente) do que está **implícito** (nas entrelinhas). O ENEM adora testar inferências." },
      { level: 3, content: "**Dica #3 (Última):** Identifique a **tese** do autor e os **argumentos** que ele usa para sustentá-la. Isso resolve a maioria das questões de interpretação." },
    ],
    finalAnswer: "A chave da interpretação no ENEM é sempre **voltar ao texto**. A resposta certa nunca contradiz o que o autor disse, mesmo que pareça óbvia demais.",
  },

  // ── LC-C3 — Literatura ───────────────────────────────────
  {
    competencyCode: "LC-C3",
    topic: "Modernismo Brasileiro",
    tips: [
      { level: 1, content: "**Dica #1:** O Modernismo brasileiro tem **3 fases**. A 1ª (1922-1930) é a mais radical — ruptura com o passado, valorização do popular e do nacional." },
      { level: 2, content: "**Dica #2:** A **Semana de Arte Moderna de 1922** é o marco inicial. Os autores mais cobrados são Oswald de Andrade, Mário de Andrade e Manuel Bandeira." },
      { level: 3, content: "**Dica #3 (Última):** O ENEM gosta de pedir a relação entre o contexto histórico e as características literárias. Ligue o Modernismo à industrialização e ao nacionalismo dos anos 1920." },
    ],
    finalAnswer: "No Modernismo, o grande diferencial é a **linguagem coloquial** e a **ruptura com o parnasianismo**. Macunaíma (Mário de Andrade) é o texto mais cobrado — herói sem caráter = crítica à identidade nacional.",
  },

  // ── LC-C4 — Redação: Estrutura ──────────────────────────
  {
    competencyCode: "LC-C4",
    topic: "Estrutura da Redação",
    tips: [
      { level: 1, content: "**Dica #1:** A redação do ENEM tem estrutura fixa: **Introdução** (apresentar tese) → **2 Desenvolvimentos** (argumentar) → **Conclusão** (proposta de intervenção)." },
      { level: 2, content: "**Dica #2:** A **Competência 2** cobra o uso de repertório sociocultural. Cite dados, leis, filósofos ou fatos históricos para embasar seus argumentos." },
      { level: 3, content: "**Dica #3 (Última):** Cada parágrafo de desenvolvimento deve ter: **tópico frasal** (ideia central) + **argumentação** (desenvolvimento) + **exemplo** (concretização)." },
    ],
    finalAnswer: "Uma redação nota 1000 tem **4 parágrafos bem delimitados**, tese clara, dois argumentos sólidos com repertório e proposta de intervenção com os 5 elementos da C5.",
  },

  // ── LC-C5 — Redação: Proposta de Intervenção ────────────
  {
    competencyCode: "LC-C5",
    topic: "Proposta de Intervenção",
    tips: [
      { level: 1, content: "**Dica #1:** A Competência 5 exige **5 elementos** obrigatórios. O primeiro é o **Agente** — quem vai executar a ação?\n\nEx: Governo Federal, escolas, ONGs, mídia." },
      { level: 2, content: "**Dica #2:** Além do Agente, você precisa da **Ação** (o que fazer?) e do **Meio/Modo** (como fazer?).\n\nEx: 'O MEC **(agente)** deve criar campanhas **(ação)** nas escolas públicas **(meio)**...'" },
      { level: 3, content: "**Dica #3 (Última):** Os dois últimos são o **Efeito** (para quê?) e o **Detalhamento** (informação extra sobre qualquer um dos anteriores)." },
    ],
    finalAnswer: "'O Ministério da Educação **(agente)** deve implementar oficinas de leitura **(ação)** nas escolas públicas **(meio)**, a fim de desenvolver o senso crítico dos alunos **(efeito)**, especialmente os do Ensino Médio **(detalhamento)**.'",
  },

  // ── MT-C1 — Números e operações ─────────────────────────
  {
    competencyCode: "MT-C1",
    topic: "Porcentagem",
    tips: [
      { level: 1, content: "**Dica #1:** Porcentagem é sempre uma fração com denominador 100. Para calcular X% de um valor, multiplique o valor por X e divida por 100." },
      { level: 2, content: "**Dica #2:** Para aumentos e descontos, use o **fator multiplicativo**.\n\nAumento de 20% → multiplique por **1,20**\nDesconto de 20% → multiplique por **0,80**" },
      { level: 3, content: "**Dica #3 (Última):** Para aumentos/descontos sucessivos, **nunca some as porcentagens**. Aplique um fator de cada vez.\n\n20% de aumento + 20% de desconto ≠ 0%" },
    ],
    finalAnswer: "O erro mais comum no ENEM é somar porcentagens sucessivas. Sempre aplique os fatores multiplicativos em sequência: 1,20 × 0,80 = 0,96 → desconto real de **4%**.",
  },

  // ── MT-C2 — Álgebra e equações ──────────────────────────
  {
    competencyCode: "MT-C2",
    topic: "Equações do 1º Grau",
    tips: [
      { level: 1, content: "**Dica #1:** Analise os sinais dos termos independentes. Ao passar um termo para o outro lado da igualdade, o **sinal sempre troca**.\n\n2X + 10 = 34 → 2X = 34 **- 10**" },
      { level: 2, content: "**Dica #2:** Isole a variável X no primeiro membro. Passe tudo que **não tem X** para o lado direito da equação." },
      { level: 3, content: "**Dica #3 (Última):** Com X isolado, divida ambos os lados pelo coeficiente de X.\n\n2X = 24 → X = 24 **÷ 2** → X = 12" },
    ],
    finalAnswer: "O resultado é **X = 12**. O método é sempre: 1) passar termos independentes para um lado, 2) passar o coeficiente dividindo, 3) calcular.",
  },

  // ── MT-C3 — Geometria ────────────────────────────────────
  {
    competencyCode: "MT-C3",
    topic: "Teorema de Pitágoras",
    tips: [
      { level: 1, content: "**Dica #1:** O Teorema de Pitágoras vale **apenas para triângulos retângulos**. A hipotenusa (lado maior, oposto ao ângulo reto) é sempre o **c** da fórmula: a² + b² = c²." },
      { level: 2, content: "**Dica #2:** Identifique qual lado é a hipotenusa antes de montar a equação. O ângulo reto fica sempre entre os dois catetos (**a** e **b**)." },
      { level: 3, content: "**Dica #3 (Última):** As ternas pitagóricas mais cobradas no ENEM: **3, 4, 5** e **5, 12, 13**. Se aparecerem múltiplos delas (6, 8, 10), o teorema também vale." },
    ],
    finalAnswer: "Para um triângulo com catetos 3 e 4: **3² + 4² = c²** → 9 + 16 = 25 → c = **5**. Memorize as ternas pitagóricas — economizam tempo na prova.",
  },

  // ── MT-C4 — Probabilidade e Estatística ─────────────────
  {
    competencyCode: "MT-C4",
    topic: "Probabilidade Básica",
    tips: [
      { level: 1, content: "**Dica #1:** Probabilidade é sempre uma fração:\n\n**P = Casos Favoráveis / Casos Possíveis**\n\nO resultado fica entre 0 (impossível) e 1 (certeza)." },
      { level: 2, content: "**Dica #2:** Identifique bem o **espaço amostral** (todos os resultados possíveis) antes de contar os casos favoráveis." },
      { level: 3, content: "**Dica #3 (Última):** O resultado pode ser expresso como **fração**, **decimal** ou **porcentagem** — multiplique por 100 para converter." },
    ],
    finalAnswer: "Com 3 bolas azuis em 10: P = **3/10 = 0,3 = 30%**. A fórmula P = Casos Favoráveis / Casos Possíveis resolve praticamente todas as questões de probabilidade do ENEM.",
  },

  // ── CN-C1 — Biologia ─────────────────────────────────────
  {
    competencyCode: "CN-C1",
    topic: "Genética Mendeliana",
    tips: [
      { level: 1, content: "**Dica #1:** Toda questão de genética do ENEM começa pelo **quadro de Punnett**. Monte o cruzamento com os gametas dos pais para encontrar as proporções da prole." },
      { level: 2, content: "**Dica #2:** Lembre-se: **dominante** (D) se expressa mesmo com um único alelo. **Recessivo** (r) só se expressa quando há dois alelos iguais (rr)." },
      { level: 3, content: "**Dica #3 (Última):** A proporção clássica de Mendel para um cruzamento **Dd × Dd** é:\n\n**3 dominantes : 1 recessivo** (fenotípica)\n**1 DD : 2 Dd : 1 dd** (genotípica)" },
    ],
    finalAnswer: "No cruzamento Dd × Dd, **75% da prole** apresenta o fenótipo dominante e **25%** o recessivo. Esta proporção 3:1 é a mais cobrada em genética no ENEM.",
  },

  // ── CN-C2 — Física ───────────────────────────────────────
  {
    competencyCode: "CN-C2",
    topic: "Leis de Newton",
    tips: [
      { level: 1, content: "**Dica #1:** A **1ª Lei (Inércia)** diz que um objeto em repouso fica em repouso e um em movimento continua em movimento — a menos que uma força externa aja sobre ele." },
      { level: 2, content: "**Dica #2:** A **2ª Lei (F = m·a)** relaciona força, massa e aceleração. Quanto maior a massa, maior a força necessária para produzir a mesma aceleração." },
      { level: 3, content: "**Dica #3 (Última):** A **3ª Lei (Ação e Reação)** diz que para toda força exercida em um objeto, existe uma força igual em módulo e direção, mas oposta em sentido." },
    ],
    finalAnswer: "O ENEM adora aplicar as Leis de Newton em contextos cotidianos — cinto de segurança (1ª lei), empurrão de carro (2ª lei), foguete (3ª lei). Identifique o contexto antes de aplicar a fórmula.",
  },

  // ── CN-C3 — Química ──────────────────────────────────────
  {
    competencyCode: "CN-C3",
    topic: "Estequiometria",
    tips: [
      { level: 1, content: "**Dica #1:** Toda estequiometria segue **3 passos**: escrever a reação → balancear a equação → fazer a regra de três. Você já escreveu a reação?" },
      { level: 2, content: "**Dica #2:** Para balancear, iguale o número de átomos de cada elemento nos dois lados. Comece pelos elementos que aparecem em **menos compostos**." },
      { level: 3, content: "**Dica #3 (Última):** Use os **coeficientes da equação balanceada** para montar a regra de três — nunca os índices!\n\n2H₂ + O₂ → 2H₂O\n2 mol H₂ : 2 mol H₂O = proporção 1:1" },
    ],
    finalAnswer: "O segredo da estequiometria é sempre trabalhar com **mol** e os **coeficientes balanceados**. A partir deles, converta para massa usando as massas molares da tabela periódica.",
  },

  // ── CH-C1 — História ─────────────────────────────────────
  {
    competencyCode: "CH-C1",
    topic: "Era Vargas",
    tips: [
      { level: 1, content: "**Dica #1:** A Era Vargas (1930-1945) é dividida em 3 fases: **Governo Provisório** (1930-34) → **Governo Constitucional** (1934-37) → **Estado Novo** (1937-45)." },
      { level: 2, content: "**Dica #2:** O ENEM foca no **populismo** e nas **leis trabalhistas**. A CLT (1943) foi a principal conquista do período — Vargas se autoproclamou 'pai dos pobres'." },
      { level: 3, content: "**Dica #3 (Última):** O **DIP (Departamento de Imprensa e Propaganda)** era o órgão de censura e exaltação do regime. O ENEM adora trazer textos do DIP pedindo para identificar características autoritárias." },
    ],
    finalAnswer: "Os 3 pilares mais cobrados da Era Vargas no ENEM: **CLT** (trabalhismo), **DIP** (autoritarismo/censura) e **industrialização** (criação da CSN e Vale do Rio Doce). Relacione sempre ao contexto da 2ª Guerra Mundial.",
  },

  // ── CH-C2 — Geografia ────────────────────────────────────
  {
    competencyCode: "CH-C2",
    topic: "Urbanização Brasileira",
    tips: [
      { level: 1, content: "**Dica #1:** A urbanização brasileira foi **rápida e desigual** — ocorreu principalmente entre 1950-1980 com o processo de industrialização e êxodo rural." },
      { level: 2, content: "**Dica #2:** O crescimento acelerado das cidades gerou problemas: **favelização**, déficit habitacional, violência urbana e sobrecarga de infraestrutura." },
      { level: 3, content: "**Dica #3 (Última):** O ENEM gosta de cobrar **megalópoles** e **metropolização**. A principal é o eixo SP-RJ. Conheça também o conceito de cidade **primaz** (São Paulo = primate city)." },
    ],
    finalAnswer: "O Brasil passou de **31% urbano em 1940** para mais de **87% em 2020**. O ENEM relaciona urbanização com desigualdade social, especulação imobiliária e problemas ambientais nas cidades.",
  },

  // ── CH-C3 — Filosofia ────────────────────────────────────
  {
    competencyCode: "CH-C3",
    topic: "Iluminismo",
    tips: [
      { level: 1, content: "**Dica #1:** O Iluminismo (séc. XVIII) defendia a **razão** como guia da humanidade, em oposição à fé e à tradição religiosa. Seu lema: *Sapere Aude* (Ouse saber)." },
      { level: 2, content: "**Dica #2:** Os principais iluministas cobrados no ENEM: **Locke** (direitos naturais), **Rousseau** (contrato social, vontade geral), **Montesquieu** (separação dos poderes)." },
      { level: 3, content: "**Dica #3 (Última):** O ENEM relaciona o Iluminismo a eventos históricos como a **Revolução Francesa** e a **Independência Americana** — identifique os princípios iluministas nos documentos históricos." },
    ],
    finalAnswer: "O conceito mais cobrado é a **separação dos poderes** de Montesquieu (Executivo, Legislativo, Judiciário) e o **contrato social** de Rousseau (o povo cede parte da liberdade em troca de segurança e bem comum).",
  },

  // ── CH-C4 — Sociologia ───────────────────────────────────
  {
    competencyCode: "CH-C4",
    topic: "Desigualdade Social",
    tips: [
      { level: 1, content: "**Dica #1:** O ENEM aborda desigualdade social pela ótica de três autores clássicos: **Marx** (classes e luta de classes), **Weber** (estamentos e status) e **Durkheim** (solidariedade social)." },
      { level: 2, content: "**Dica #2:** Para **Marx**, a desigualdade vem da **propriedade dos meios de produção** — quem possui os meios explora quem só tem a força de trabalho." },
      { level: 3, content: "**Dica #3 (Última):** Para **Weber**, a desigualdade é multidimensional: **classe** (econômica) + **status** (prestígio) + **partido** (poder político). Não é só sobre dinheiro." },
    ],
    finalAnswer: "O ENEM costuma apresentar situações do cotidiano e pedir qual autor melhor explica o fenômeno. Decore: **Marx = conflito de classes**, **Weber = múltiplas dimensões**, **Durkheim = coesão social**.",
  },
];

export const getTipSuggestions = (level: 1 | 2 | 3): Suggestion[] => {
  if (level < 3) return [{ label: "💡 Próxima dica", value: "action_next_tip" }];
  return [{ label: "✅ Ver resposta final", value: "action_next_tip" }];
};