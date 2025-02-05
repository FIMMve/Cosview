import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(query){
      const evaluation = await prisma.evaluations.findUnique({ where: {company_id: +(query)}})
      if(!evaluation) return NextResponse.json({
        error: "No se ha encontrado la evaluación"
      },{
        status: 400
      })

      return NextResponse.json({
        message: evaluation
      },{
        status: 200
      })
    }

    if(!query){
      const evaluations = await prisma.evaluations.findMany()
      if(!evaluations) return NextResponse.json({
        error: "No se han encontrado evaluaciones"
      },{
        status: 400
      })

      return NextResponse.json({
        message: evaluations
      },{
        status: 200
      })
    }

  }catch(error){
    console.log(error)
    return NextResponse.json({
      error: error as Error
    },{
      status: 500
    })
  }
}