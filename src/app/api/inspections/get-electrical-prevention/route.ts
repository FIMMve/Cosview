import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la señalización"}, {status: 400})

    const electricalPrevention = await prisma.electricalPrevention.findUnique({
      where: {company_id: +(query)},
    })

    if(!electricalPrevention) return NextResponse.json({error: "No se ha encontrado la Prevencion Electrica"}, {status: 400})
    
    return NextResponse.json({message: electricalPrevention}, {status: 200, statusText: "Prevencion Electrica Encontrada"})
  }catch(error){
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}