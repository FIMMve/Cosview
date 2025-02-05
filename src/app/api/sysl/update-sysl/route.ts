/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { calculateDatePunctuation, calculatePercentage } from "@/app/utils/evaluations";

export async function POST(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const data = await request.json()

  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado el programa de sysl"}, {status: 400})

    const sysl = await prisma.sysl.update({
      where: {company_id: +(query)},
      data: data
    })

    if(!sysl) return NextResponse.json({error: "No se ha encontrado el programa de sysl"}, {status: 400})

    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const billboardEvaluation = ((
      sysl.committee_registration + sysl.service_registration + sysl.sysl_policies + sysl.occupational_medical + sysl.statistics + sysl.informative_topics
    ) / 6)

    const evaluationData = {
      sysl: {
        percentage: 0,
        sysl_program: calculateDatePunctuation(sysl.sysl_program, evaluation?.reference_date),
        participation_approval_minutes: sysl.participation_approval_minutes === "cumple" ? 3 : 0,
        signed_program: sysl.signed_program ? 3 : 0,
        // @ts-expect-error
        folder: sysl.folder?.percentage ? +(sysl.folder.percentage) > 0.8 ? 3 : 1 : 0,
        accident_rate: calculateDatePunctuation(sysl.accident_rate, evaluation?.reference_date),
        morbidity_rate: calculateDatePunctuation(sysl.morbidity_rate, evaluation?.reference_date),
        occupational_doctor: sysl.occupational_doctor ? 3 : 0,
        prl: calculateDatePunctuation(sysl.prl, evaluation?.reference_date),
        billboard: billboardEvaluation >= 0.8 ? 3 : billboardEvaluation === 0 ? 0 : 1 
      }
    }

    evaluationData.sysl.percentage = calculatePercentage(evaluationData.sysl, 9)

    const updatedEvaluation = await prisma.evaluations.update({
      where: {company_id: +(query)},
      data: evaluationData
    }) 

    if(!updatedEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({message: sysl}, {status: 200, statusText: "Programa de Sysl Actualizado Correctamente"})
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}