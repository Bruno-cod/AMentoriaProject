import { ChatHistoryData } from "@/types/chat";

export const mockChatHistory: ChatHistoryData[] = [
  {
    id: "ana-chat-1",
    alunoEmail: "ana.beatriz@email.com",
    topic: "Redação ENEM: Competência 1 e uso da vírgula",
    date: "2026-04-12T14:32:00Z",
    isFinished: false,
    messages: [
      { id: "m1", role: "user", content: "Eu sempre perco ponto na Competência 1 da redação por causa do uso da vírgula. Tem alguma regra fácil pra eu lembrar na hora da prova?" },
      { id: "m2", role: "ai", content: "Com certeza, Ana! O erro mais comum no ENEM é separar o Sujeito do Verbo ou o Verbo do Complemento (a famosa regra do SVC). Se você gravar que não pode colocar vírgula entre quem faz a ação e a ação em si, você já elimina 80% dos erros." },
      { id: "m3", role: "user", content: "Entendi... mas e quando tem o 'porém' no meio da frase?" },
      { 
        id: "m4", 
        role: "ai", 
        content: "Nesse caso, você nunca deve usar vírgula antes do 'porém', pois ele é uma conjunção que não exige pontuação no ENEM.", 
        rating: "down", 
        feedbackText: "A IA errou a regra de português. Meu professor disse que a vírgula é obrigatória antes do porém!" 
      }
    ]
  },
  {
    id: "ana-chat-2",
    alunoEmail: "ana.beatriz@email.com",
    topic: "Matemática: Probabilidade Básica",
    date: "2026-04-10T10:15:00Z",
    isFinished: true,
    messages: [
      { id: "m5", role: "user", content: "Estou travada em uma questão que pede a probabilidade de tirar uma bola azul de uma urna." },
      { id: "m6", role: "ai", content: "Lembre-se da fórmula de ouro da probabilidade no ENEM: é sempre o que você **quer** dividido pelo que você **tem** (Casos Favoráveis / Casos Possíveis). Quantas bolas azuis e quantas bolas no total existem nessa urna?" },
      { id: "m7", role: "user", content: "Ah, são 3 azuis num total de 10 bolas. Então é 3/10, ou 30%? É só isso?" },
      { id: "m8", role: "ai", content: "Exatamente! Viu como é mais simples do que parece? Parabéns!" }
    ]
  },
  {
    id: "cadu-chat-1",
    alunoEmail: "cadu.edu@email.com",
    topic: "Química: Estequiometria",
    date: "2026-04-12T09:15:00Z",
    isFinished: false,
    messages: [
      { id: "m9", role: "user", content: "Cara, toda questão de estequiometria do ENEM parece grego pra mim. Por onde eu começo?" },
      { 
        id: "m10", 
        role: "ai", 
        content: "A estequiometria assusta, Carlos, mas é como seguir uma receita de bolo! O ENEM sempre exige 3 passos: 1. Escrever a reação; 2. Balancear a equação; 3. Fazer a regra de três. Você já sabe fazer o balanceamento?",
        rating: "down",
        feedbackText: "Achei a explicação muito superficial, queria que ela resolvesse um exemplo prático comigo passo a passo."
      }
    ]
  },
  {
    id: "nanda-chat-1",
    alunoEmail: "nanda.lima@email.com",
    topic: "História: Era Vargas",
    date: "2026-04-11T18:40:00Z",
    isFinished: true,
    messages: [
      { id: "m11", role: "user", content: "O que eu preciso focar de Era Vargas? Cai todo ano né?" },
      { id: "m12", role: "ai", content: "Cai quase todo ano, Fernanda! O ENEM adora focar na transição das leis trabalhistas (CLT), na criação das indústrias de base (como a Vale do Rio Doce) e no conceito de populismo. Eles adoram colocar textos do DIP pedindo para você identificar a censura e exaltação do líder." },
      { id: "m13", role: "user", content: "Anotado! Vou revisar o DIP e a CLT hoje mesmo." }
    ]
  },
  {
    id: "jp-chat-1",
    alunoEmail: "jp.silva@email.com",
    topic: "Matemática: Análise Combinatória",
    date: "2023-10-22T15:20:00Z", 
    isFinished: false,
    messages: [
      { id: "m14", role: "user", content: "Socorro! Eu nunca sei quando usar Arranjo ou Combinação na prova." },
      { 
        id: "m15", 
        role: "ai", 
        content: "João, vou te passar o macete que salva vidas no ENEM: Faça a si mesmo a pergunta 'A ordem importa?'. Se a ordem importa, use o Arranjo. Se não importa, use a Combinação. A fórmula da combinação é C = n! / p!. Tente aplicar isso na sua questão.",
        rating: "down", 
        feedbackText: "A IA me passou a fórmula da Combinação incompleta! Faltou o (n-p)! no denominador, quase errei a questão por causa disso."
      }
    ]
  },
  {
    id: "mari-chat-1",
    alunoEmail: "mari.costa@email.com",
    topic: "Redação ENEM: Competência 5",
    date: "2023-10-20T10:00:00Z",
    isFinished: true,
    messages: [
      { id: "m16", role: "user", content: "Para tirar 200 pontos na C5, eu sou obrigada a colocar os 5 elementos na proposta?" },
      { id: "m17", role: "ai", content: "Sim, Mariana! É matemática pura. Para gabaritar a Competência 5, o avaliador precisa encontrar 5 elementos: 1. Agente (quem vai fazer?); 2. Ação (o que vai ser feito?); 3. Meio/Modo (como vai ser feito?); 4. Efeito (para quê?); 5. Detalhamento (uma informação extra sobre qualquer um dos anteriores)." },
      { id: "m18", role: "user", content: "Entendi. Eu estava esquecendo do detalhamento. O Ministério da Educação criar campanhas nas escolas é um bom começo?" },
      { id: "m19", role: "ai", content: "Ótimo começo! Aí você já tem o Agente (MEC), a Ação (criar campanhas) e o Meio (nas escolas). Falta só o Efeito e Detalhar um desses pontos!" }
    ]
  }
];