import { NextResponse } from "next/server";
import { mockAlunos } from "@/mocks";

let baseDeDadosAlunos = [...mockAlunos];

export async function GET() {
  return NextResponse.json(baseDeDadosAlunos);
}

export async function POST(request: Request) {
  const dadosDoCadastro = await request.json();
  
  const novoAluno = {
    id: Math.random().toString(36).substring(2, 9), 
    name: dadosDoCadastro.name,
    email: dadosDoCadastro.email,
    progress: 0,
    status: "ativo",
    lastInteraction: new Date().toLocaleDateString("pt-BR")
  };

  
  baseDeDadosAlunos.push(novoAluno);
  
  return NextResponse.json(novoAluno, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  baseDeDadosAlunos = baseDeDadosAlunos.filter(a => a.id !== id);
  return NextResponse.json({ message: "Aluno excluído com sucesso" });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { email, lastInteraction } = body;

  const index = baseDeDadosAlunos.findIndex(a => a.email === email);

  if (index !== -1) {
    baseDeDadosAlunos[index] = {
      ...baseDeDadosAlunos[index],
      lastInteraction: lastInteraction,
      
    };
    
    return NextResponse.json({ 
      message: "Aluno atualizado com sucesso!", 
      aluno: baseDeDadosAlunos[index] 
    });
  } else {
    const nomeImprovisado = email.split('@')[0].replace('.', ' '); 
    
    const novoAluno = {
      id: `aluno-${Date.now()}`,
      name: nomeImprovisado.charAt(0).toUpperCase() + nomeImprovisado.slice(1), 
      email: email,
      status: "active", 
      lastInteraction: lastInteraction,
      avatar: undefined 
    };
    
    baseDeDadosAlunos.push(novoAluno);
    
    return NextResponse.json({ 
      message: "Aluno não existia, mas foi criado e atualizado com sucesso!", 
      aluno: novoAluno 
    }, { status: 201 });
  }
}