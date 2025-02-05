import { calculateDatePunctuation, calculatePercentage } from "@/app/utils/evaluations";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const query = req.nextUrl.searchParams.get("query")
  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})

    const committee = await prisma.committee.update({
      where: {company_id: +(query)},
      data: data
    })

    if(!committee) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})

    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    const evaluationData = {
      committee: {
        percentage: 0,
        center_certificate: committee.center_certificate !== null && committee.center_certificate !== "No Posee" ? 3 : 0,
        committee_certificate: committee.committee_certificate !== null && committee.committee_certificate !== "No Posee" ? 3 : 0,
        delegate_certificate: committee.delegate_certificate !== null && committee.delegate_certificate !== "No Posee" ? 3 : 0,
        inpsasel_report: calculateDatePunctuation(committee?.inpsasel_report_date, evaluation?.reference_date),
        transcription: calculateDatePunctuation(committee?.transcription_date, evaluation?.reference_date),
      }
    }

    evaluationData.committee.percentage = calculatePercentage(evaluationData.committee, 5)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedPunctuation = await prisma.evaluations.update({
      where: { company_id: +(query) },
      data: evaluationData
    })

    return NextResponse.json({message: "Comité Actualizado Correctamente"}, {status: 200, statusText: "Comité Actualizado Correctamente"})

  }catch(error){
    console.log(data)
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}