import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la inspeccion"}, {status: 400})

    const fireExtinguisher = await prisma.fireExtinguisher.findMany({where: {company_id: +(query)}})

    if(!fireExtinguisher) return NextResponse.json({error: "No se ha encontrado la inspeccion"}, {status: 400})
    
    return NextResponse.json({message: fireExtinguisher}, {status: 200, statusText: "Inspeccion Actualizada Correctamente"})
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}