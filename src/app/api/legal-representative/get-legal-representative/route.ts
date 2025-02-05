import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const id = searchParams.get("id")
  
  try{
    if(query){
      const company = await prisma.company.findUnique({
        where: {id: +query}
      })

      let legalRepresentative

      if(company?.legal_representative_id){
        legalRepresentative = await prisma.legalRepresentative.findUnique({
          where: {id: +(company.legal_representative_id)}
        })
      } else {
        return NextResponse.json({
          error: "No existe representante legal asociado a esta empresa..."
        }, 
        {
          status: 500, 
          statusText: "No existe representante legal asociado a esta empresa..."
        })
      }
  
      if(!legalRepresentative) NextResponse.json({
        error: "Error al obtener el representante legal..."
      }, 
      {
        status: 500, 
        statusText: "Error al obtener el representante legal..."
      })
    
      return NextResponse.json({
        legalRepresentative: legalRepresentative
      },{
        status: 200,
        statusText: "Representante legal obtenido..."
      })
    }
  
    if(id){
      const legalRepresentative = await prisma.legalRepresentative.findUnique({
        where: {id: +(id)}
      })
  
      if(!legalRepresentative) return NextResponse.json({
        error: "Error al obtener el representante legal..."
      }, 
      {
        status: 500, 
        statusText: "Error al obtener el representante legal..."
      })
    
      return NextResponse.json({
        legalRepresentative: legalRepresentative
      },{
        status: 200,
        statusText: "Representante legal obtenido..."
      })
    }
  
    const legalRepresentatives = await prisma.legalRepresentative.findMany()
    if(!legalRepresentatives) return NextResponse.json({
      error: "Error al obtener los representantes legales.."
    }, 
    {
      status: 500, 
      statusText: "Error al obtener los representantes legales.."
    })
  
    return NextResponse.json({
      legalRepresentatives: legalRepresentatives
    },{
      status: 200,
      statusText: "Representantes legales optenidos..."
    })
  

  }catch(error){
    console.log(error as Error)
    return NextResponse.json({
      error: error
    },{
      status: 500
    })
  }
}