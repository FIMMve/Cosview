import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { dateComparator } from "@/app/utils/dateFormatter";

export async function PUT(request: NextRequest){
  const data = await request.json()

  try{
    const capacitation = {...data}
    delete capacitation.company_id
    delete capacitation.id

    const updatedCapacitation = await prisma.capacitation.update({
      where: {
        id: +(data?.id)
      },
      data: capacitation
    })

    const capacitations = await prisma.capacitation.findMany({
      where: {
        company_id: +(updatedCapacitation.company_id)
      },
      orderBy: {
        id: 'desc'
      }
    })

    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +data.company_id } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const grade = dateComparator(capacitations[0].date, evaluation.reference_date)

    const evaluationData = {
      capacitations: {
        percentage: grade === true ? 0 : 1,
        capacitation: grade === true ? 0 : 1
      }
    }

    const updatedEvaluation = await prisma.evaluations.update({
      where: {company_id: +data.company_id},
      data: evaluationData
    }) 

    if(!updatedEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({
      message: "Capacitacion Agregada..."
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