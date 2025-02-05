import { calculatePercentage } from "@/app/utils/evaluations";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest){
  const data = await request.json()

  try{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newFE = await prisma.fireExtinguisher.create({ data: data })

    const FEList = await prisma.fireExtinguisher.findMany({
      where: {
        company_id: +(data.company_id)
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
      message: "Extintor Agregado..."
    },{
      status: 200,
    })
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}