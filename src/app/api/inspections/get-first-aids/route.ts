import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado el botiquin"}, {status: 400})

    const fisrtAids = await prisma.firstAid.findUnique({where: {company_id: +(query)}})

    if(!fisrtAids) return NextResponse.json({error: "No se ha encontrado el botiquin"}, {status: 400})
    
    return NextResponse.json({message: fisrtAids}, {status: 200, statusText: "Botiquin Actualizado Correctamente"})
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}