import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la señalización"}, {status: 400})

    const signaling = await prisma.signaling.findUnique({
      where: {company_id: +(query)},
    })

    if(!signaling) return NextResponse.json({error: "No se ha encontrado la señalización"}, {status: 400})
    
    return NextResponse.json({message: signaling}, {status: 200, statusText: "Señalizacion Encontrada"})
  }catch(error){
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}