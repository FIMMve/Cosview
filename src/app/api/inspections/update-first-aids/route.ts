import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { calculatePercentage } from "@/app/utils/evaluations";

export async function POST(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const data = await request.json()

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la inspeccion"}, {status: 400})
    
    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const grade = +data?.firstAids >= 0.55 ? 3 : +data?.firstAids === 0 ? 0 : 1

    const evaluationData = {
      inspection: {
        ...(typeof evaluation.inspection === 'object' ? evaluation.inspection : {}),
        first_aids: grade,
        percentage: 0
      }
    }
    evaluationData.inspection.percentage = calculatePercentage(evaluationData.inspection, 5)

    const updatedEvaluation = await prisma.evaluations.update({
      where: {company_id: +(query)},
      data: evaluationData
    }) 

    const firstAidData = {...data}
    delete firstAidData.firstAids
    
    const firstAid = await prisma.firstAid.update({
      where: {company_id: +query},
      data: firstAidData
    })
  
    if(!firstAid) return NextResponse.json({error: "No se ha encontrado El botiquín"}, {status: 400})

    if(!updatedEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({message: firstAid}, {status: 200, statusText: "Inspeccion Actualizada Correctamente"})

  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}