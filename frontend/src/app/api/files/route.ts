import { NextResponse } from "next/server";
import { mockFiles } from "@/mocks";

let baseDeDadosSimulada = [...mockFiles];


export async function GET() {
  return NextResponse.json(baseDeDadosSimulada);
}


export async function POST(request: Request) {
  const novoArquivo = await request.json();
  
 
  const arquivoFormatado = {
    id: Math.random().toString(36).substr(2, 9),
    name: novoArquivo.name,
    size: "0 KB", 
    uploadDate: new Date().toLocaleDateString('pt-BR')
  };

  baseDeDadosSimulada.push(arquivoFormatado);
  return NextResponse.json(arquivoFormatado);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  baseDeDadosSimulada = baseDeDadosSimulada.filter(f => f.id !== id);
  
  return NextResponse.json({ message: "Excluído com sucesso" });
}