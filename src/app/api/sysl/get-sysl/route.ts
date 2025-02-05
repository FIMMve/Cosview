import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado el programa de sysl"}, {status: 400})

    const sysl = await prisma.sysl.findUnique({where: {company_id: +(query)}})

    if(!sysl) return NextResponse.json({error: "No se ha encontrado el programa de sysl"}, {status: 400})
    
    return NextResponse.json({message: sysl}, {status: 200, statusText: "Programa de Sysl Actualizado Correctamente"})
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}