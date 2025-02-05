import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if(!query){
    const companies = await prisma.company.findMany()
    if(!companies) NextResponse.json({
      error: "Error al obtener empresas..."
    }, 
    {
      status: 500, 
      statusText: "Error al obtener empresas..."
    })
  
    return NextResponse.json({
      companies: companies
    },{
      status: 200,
      statusText: "Empresas obtenidas..."
    })
  }

  const company = await prisma.company.findUnique({
    where: {id: +query}
  })
  if(!company) NextResponse.json({
    error: "Error al obtener empresa..."
  }, 
  {
    status: 500, 
    statusText: "Error al obtener empresa..."
  })

  return NextResponse.json({
    company: company
  },{
    status: 200,
    statusText: "Empresa obtenido..."
  })

}