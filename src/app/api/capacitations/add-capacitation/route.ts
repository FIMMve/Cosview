import { dateComparator } from "@/app/utils/dateFormatter";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest){
  const data = await request.json()

  try{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newCapacitation = await prisma.capacitation.create({ data: data })

    const capacitations = await prisma.capacitation.findMany({
      where: {
        company_id: +(data.company_id)
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
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}