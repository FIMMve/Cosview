import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { calculateDatePunctuation, calculatePercentage } from "@/app/utils/evaluations";

export async function POST(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const data = await request.json()
  console.log(data)

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la inspeccion"}, {status: 400})
    
    const inspection = await prisma.inspection.update({
      where: {company_id: +query},
      data: data
    })

    if(!inspection) return NextResponse.json({error: "No se ha encontrado la inspeccion"}, {status: 400})
    
    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const evaluationData = {
      inspection: {
        ...(typeof evaluation.inspection === 'object' ? evaluation.inspection : {}),
        observation: calculateDatePunctuation(inspection?.inspection_date, evaluation?.reference_date),
        percentage: 0
      }
    }
    evaluationData.inspection.percentage = calculatePercentage(evaluationData.inspection, 5)

    const updatedEvaluation = await prisma.evaluations.update({
      where: {company_id: +(query)},
      data: evaluationData
    }) 

    if(!updatedEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({message: inspection}, {status: 200, statusText: "Inspeccion Actualizada Correctamente"})

  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}