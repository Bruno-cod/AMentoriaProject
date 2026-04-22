import { NextResponse } from "next/server";
import { mockChatHistory } from "@/mocks"

let baseDeDadosMock: any[] = [...mockChatHistory];


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (email) {
    const historicoDoAluno = baseDeDadosMock.filter(chat => chat.alunoEmail === email);
    
    historicoDoAluno.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(historicoDoAluno);
  }


  return NextResponse.json(baseDeDadosMock);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chatId, alunoEmail, topic, messages, isFinished } = body;

    const indexExistente = baseDeDadosMock.findIndex(chat => chat.id === chatId);

    if (indexExistente !== -1) {
      baseDeDadosMock[indexExistente] = {
        ...baseDeDadosMock[indexExistente],
        topic: topic, 
        messages: messages,
        isFinished: isFinished,
        lastUpdate: new Date().toISOString() 
      };
      
      return NextResponse.json({ 
        message: "Histórico atualizado com sucesso!", 
        chat: baseDeDadosMock[indexExistente] 
      }, { status: 200 });

    } else {
      const novoChat = {
        id: chatId,
        alunoEmail: alunoEmail,
        topic: topic,
        date: new Date().toISOString(),
        messages: messages,
        isFinished: isFinished,
      };
      
      baseDeDadosMock.push(novoChat);
      
      return NextResponse.json({ 
        message: "Histórico criado com sucesso!", 
        chat: novoChat 
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error("Erro na API de histórico:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao processar o histórico." }, 
      { status: 500 }
    );
  }
}