import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { calculatePercentage } from "@/app/utils/evaluations";

export async function PUT(request: NextRequest){
  const data = await request.json()

  try{
    const FE = {...data}
    delete FE.company_id
    delete FE.id
    const updatedFE = await prisma.fireExtinguisher.update({
      where: {
        id: +(data?.id)
      },
      data: FE
    })

    const FEList = await prisma.fireExtinguisher.findMany({
      where: {
        company_id: +(updatedFE.company_id)
      }
    })
    
    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +data.company_id } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const grade = FEList.filter((fe: any) => fe.maintenance === true).length / FEList.length

    const evaluationData = {
      inspection: {
        ...(typeof evaluation.inspection === 'object' ? evaluation.inspection : {}),
        fire_extinguisher: grade >= 0.7 ? 3 : grade === 0 ? 0 : 1,
        percentage: 0
      }
    }

    evaluationData.inspection.percentage = calculatePercentage(evaluationData.inspection, 5)

    const updatedEvaluation = await prisma.evaluations.update({
      where: {company_id: +data.company_id},
      data: evaluationData
    }) 

    if(!updatedEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({
      message: "Extintor Actualizado..."
    },{
      status: 200,
    })

  }catch(error){
    return NextResponse.json({
      error: error as Error
    },{
      status: 500
    })
  }
}