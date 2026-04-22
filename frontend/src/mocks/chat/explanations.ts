export type Explanation = {
  competencyCode: string;
  topic: string;
  content: string;
};

export const mockExplanations: Explanation[] = [
  // ── LC-C1 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C1",
    topic: "Uso da Vírgula",
    content: `As 3 regras de vírgula mais cobradas no ENEM:

**Regra 1 — Nunca separe Sujeito do Verbo (SVC)**
❌ 'O aluno, estudou muito.'
✅ 'O aluno estudou muito.'

**Regra 2 — Vírgula antes de conjunções adversativas**
As conjunções *porém*, *contudo*, *todavia* e *entretanto* sempre pedem vírgula antes delas.
✅ 'Estudei muito, porém não passei.'

**Regra 3 — Oração adverbial antes da principal**
Quando a oração adverbial vem antes, use vírgula para separá-la.
✅ 'Quando cheguei, a aula havia começado.'
❌ 'A aula havia começado quando cheguei.' ← sem vírgula`,
  },

  // ── LC-C2 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C2",
    topic: "Interpretação de Textos",
    content: `Como resolver questões de interpretação no ENEM:

**Passo 1 — Leia o enunciado antes do texto**
Saber o que está sendo perguntado direciona sua leitura.

**Passo 2 — Identifique o tema e a tese**
Pergunte-se: *Sobre o que o autor fala?* e *Qual é o ponto de vista dele?*

**Passo 3 — Diferencie explícito de implícito**
- **Explícito:** está dito diretamente no texto
- **Implícito (inferência):** está nas entrelinhas — o leitor deduz

**Passo 4 — Elimine as alternativas erradas**
Elimine as que contradizem o texto, extrapolam o que foi dito ou distorcem o sentido. A correta sempre tem respaldo no texto.`,
  },

  // ── LC-C4 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C4",
    topic: "Estrutura da Redação",
    content: `A estrutura da redação dissertativo-argumentativa do ENEM:

**Parágrafo 1 — Introdução**
Contextualize o tema e apresente sua tese (ponto de vista).

**Parágrafo 2 — Desenvolvimento 1**
Tópico frasal + argumento + exemplo/repertório sociocultural.

**Parágrafo 3 — Desenvolvimento 2**
Tópico frasal + argumento diferente + exemplo/repertório.

**Parágrafo 4 — Conclusão**
Retome a tese e faça a proposta de intervenção com os 5 elementos da Competência 5.

⚠️ **Dica de ouro:** Cada parágrafo deve ter um único foco. Não misture argumentos no mesmo parágrafo.`,
  },

  // ── LC-C5 ────────────────────────────────────────────────
  {
    competencyCode: "LC-C5",
    topic: "Proposta de Intervenção",
    content: `Os 5 elementos obrigatórios da Competência 5:

**1. Agente** — Quem vai executar a ação?
Ex: Governo Federal, escolas, mídia, ONGs, empresas.

**2. Ação** — O que será feito?
Ex: criar campanhas, implementar políticas, promover debates.

**3. Meio/Modo** — Como será feito?
Ex: por meio de redes sociais, em escolas públicas, via legislação.

**4. Efeito** — Para quê? Qual o objetivo?
Ex: a fim de conscientizar, com o intuito de reduzir, para garantir.

**5. Detalhamento** — Uma informação extra sobre qualquer elemento anterior.
Ex: especialmente os jovens do Ensino Médio, sobretudo nas regiões Norte e Nordeste.

✅ **Exemplo completo:**
'O Ministério da Educação **(agente)** deve criar oficinas de leitura **(ação)** nas escolas públicas **(meio)**, a fim de desenvolver o senso crítico dos estudantes **(efeito)**, especialmente os do Ensino Médio **(detalhamento)**.'`,
  },

  // ── MT-C1 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C1",
    topic: "Porcentagem",
    content: `Como resolver porcentagem no ENEM:

**Método do fator multiplicativo (o mais rápido):**
- Aumento de X% → multiplique por **(1 + X/100)**
- Desconto de X% → multiplique por **(1 - X/100)**

**Exemplos:**
- Aumento de 20%: valor × **1,20**
- Desconto de 15%: valor × **0,85**

**Porcentagens sucessivas — cuidado!**
Nunca some as porcentagens diretamente.
Aumento de 20% seguido de desconto de 20%:
1,20 × 0,80 = **0,96** → desconto real de **4%**, não zero!

**Para calcular X% de um valor:**
X% de N = (X × N) / 100`,
  },

  // ── MT-C2 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C2",
    topic: "Equações do 1º Grau",
    content: `Resolvendo **2X + 10 = 34** passo a passo:

**Passo 1 — Isolar os termos com X**
Passe o +10 para o outro lado (sinal inverte):
\`2X = 34 - 10\`

**Passo 2 — Resolver a subtração**
\`2X = 24\`

**Passo 3 — Isolar o X**
Divida ambos os lados por 2:
\`X = 24 ÷ 2\`

**Resultado: X = 12** ✅

**Regra de ouro:** Ao mover um termo de lado, a operação sempre inverte.
+ vira − / − vira + / × vira ÷ / ÷ vira ×`,
  },

  // ── MT-C3 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C3",
    topic: "Teorema de Pitágoras",
    content: `O Teorema de Pitágoras: **a² + b² = c²**

- **a** e **b** = catetos (os dois lados que formam o ângulo reto)
- **c** = hipotenusa (o lado maior, oposto ao ângulo reto)

**Exemplo com catetos 6 e 8:**
6² + 8² = c²
36 + 64 = c²
c² = 100
c = **10 cm** ✅

**Ternas pitagóricas para memorizar:**
- 3, 4, **5**
- 5, 12, **13**
- 8, 15, **17**

Múltiplos também funcionam: 6, 8, **10** (terna 3,4,5 × 2)

⚠️ O teorema só vale para **triângulos retângulos**!`,
  },

  // ── MT-C4 ────────────────────────────────────────────────
  {
    competencyCode: "MT-C4",
    topic: "Probabilidade Básica",
    content: `Fórmula da probabilidade: **P = Casos Favoráveis / Casos Possíveis**

**Passo 1 — Identifique o espaço amostral**
O espaço amostral é o conjunto de todos os resultados possíveis.
Ex: urna com 3 azuis e 7 vermelhas → 10 bolas no total.

**Passo 2 — Identifique os casos favoráveis**
O que você quer que aconteça?
Ex: retirar uma bola azul → 3 casos favoráveis.

**Passo 3 — Calcule**
P = 3/10 = 0,3 = **30%** ✅

**Conversões:**
- Fração → decimal: divida (3 ÷ 10 = 0,3)
- Decimal → porcentagem: multiplique por 100 (0,3 × 100 = 30%)`,
  },

  // ── CN-C1 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C1",
    topic: "Genética Mendeliana",
    content: `Cruzamento **Dd × Dd** pelo Quadro de Punnett:

|   | D  | d  |
|---|----|----|
| **D** | DD | Dd |
| **d** | Dd | dd |

**Proporção genotípica:** 1 DD : 2 Dd : 1 dd
**Proporção fenotípica:** **3 dominantes : 1 recessivo**

**Conceitos essenciais:**
- **Dominante (D):** se expressa com 1 ou 2 alelos (DD ou Dd)
- **Recessivo (d):** só se expressa com 2 alelos iguais (dd)
- **Homozigoto:** DD (dominante) ou dd (recessivo)
- **Heterozigoto:** Dd (portador do alelo recessivo)`,
  },

  // ── CN-C2 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C2",
    topic: "Leis de Newton",
    content: `As 3 Leis de Newton e seus contextos no ENEM:

**1ª Lei — Inércia**
Um corpo em repouso permanece em repouso e um em movimento permanece em movimento, a menos que uma força externa aja sobre ele.
📌 *Exemplos no ENEM:* cinto de segurança, passageiro que escorrega ao frear.

**2ª Lei — F = m·a**
A força resultante sobre um objeto é proporcional à sua massa e à aceleração produzida.
📌 *Exemplos no ENEM:* empurrar um carrinho de compras, lançamento de foguete.

**3ª Lei — Ação e Reação**
Para toda força exercida sobre um corpo (ação), existe uma força de igual módulo, mesma direção e sentido oposto (reação).
📌 *Exemplos no ENEM:* foguete expelindo gases, natação (braço empurra água, água empurra braço).`,
  },

  // ── CN-C3 ────────────────────────────────────────────────
  {
    competencyCode: "CN-C3",
    topic: "Estequiometria",
    content: `Os 3 passos da estequiometria:

**Passo 1 — Escrever a reação**
Ex: H₂ + O₂ → H₂O

**Passo 2 — Balancear a equação**
Iguale o número de átomos de cada elemento nos dois lados.
2H₂ + O₂ → 2H₂O ✅

**Passo 3 — Regra de três com coeficientes**
Os coeficientes indicam a proporção em moles:
2 mol H₂ → 2 mol H₂O (proporção 1:1)
4 mol H₂ → **4 mol H₂O** ✅

⚠️ **Erros mais comuns:**
- Usar os índices (₂) no lugar dos coeficientes (2)
- Esquecer de balancear antes de fazer a regra de três`,
  },

  // ── CH-C1 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C1",
    topic: "Era Vargas",
    content: `Era Vargas (1930–1945): o que o ENEM cobra

**3 fases do período:**
1. Governo Provisório (1930–34) — chegada ao poder após a Revolução de 30
2. Governo Constitucional (1934–37) — eleito indiretamente pela Assembleia
3. Estado Novo (1937–45) — ditadura, fechamento do Congresso

**Os 3 pilares mais cobrados:**
- **CLT (1943):** Consolidação das Leis do Trabalho — 8h de trabalho, férias, salário mínimo. Vargas = "pai dos pobres".
- **DIP:** censura e propaganda do regime — exaltação de Vargas, supressão da oposição.
- **Industrialização:** criação da CSN (aço) e Vale do Rio Doce (mineração).

📌 O ENEM relaciona Vargas ao contexto da **2ª Guerra Mundial** e ao **populismo latino-americano**.`,
  },

  // ── CH-C2 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C2",
    topic: "Urbanização Brasileira",
    content: `Urbanização brasileira: do campo para a cidade

**Linha do tempo:**
- 1940: 31% da população era urbana
- 1980: 67% urbana
- 2020: 87% urbana

**Causas principais:**
- Industrialização (especialmente em SP)
- Êxodo rural (mecanização do campo expulsou trabalhadores)
- Políticas de atração industrial nas cidades

**Consequências (muito cobradas no ENEM):**
- Favelização e déficit habitacional
- Violência urbana
- Sobrecarga de transporte e saneamento
- Segregação socioespacial

📌 Conceitos importantes: **metropolização**, **megalópole** (eixo SP-RJ), **cidade primaz** (São Paulo concentra funções nacionais).`,
  },

  // ── CH-C3 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C3",
    topic: "Iluminismo",
    content: `Iluminismo: razão contra o absolutismo

**Contexto:** Século XVIII, Europa. Intelectuais propõem a razão como guia da humanidade em oposição à fé e à tradição.

**Os 3 principais pensadores cobrados:**

**Locke**
- Direitos naturais: vida, liberdade e propriedade
- Governo deve proteger esses direitos — se não o fizer, o povo pode resistir

**Montesquieu**
- Separação dos poderes: Executivo, Legislativo e Judiciário
- Objetivo: impedir a concentração de poder (tiranias)

**Rousseau**
- Contrato social: o povo cede parte da liberdade em troca de segurança e bem comum
- Vontade geral: o bem coletivo acima do interesse individual

📌 O ENEM relaciona o Iluminismo à **Revolução Francesa** e à **Independência Americana**.`,
  },

  // ── CH-C4 ────────────────────────────────────────────────
  {
    competencyCode: "CH-C4",
    topic: "Desigualdade Social",
    content: `Os 3 clássicos da sociologia e a desigualdade:

**Marx**
- Desigualdade vem da **propriedade dos meios de produção**
- Burguesia (donos) × Proletariado (trabalhadores) = luta de classes
- Solução: abolir a propriedade privada

**Weber**
- Desigualdade é **multidimensional**: classe (econômica) + status (prestígio) + partido (poder político)
- Não é só sobre dinheiro — um padre pode ter status alto e renda baixa

**Durkheim**
- Foco na **coesão social** — o que mantém a sociedade unida?
- Solidariedade mecânica (sociedades simples) × solidariedade orgânica (sociedades complexas)

📌 Macete para o ENEM:
- Situação de classe/exploração → **Marx**
- Situação de prestígio/status → **Weber**
- Situação de coesão/anomia → **Durkheim**`,
  },
];