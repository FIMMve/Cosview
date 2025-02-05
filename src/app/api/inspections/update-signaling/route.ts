import { calculatePercentage } from "@/app/utils/evaluations";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const query = req.nextUrl.searchParams.get("query")
  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la señalización"}, {status: 400})

    const signaling = await prisma.signaling.update({
      where: {company_id: +(query)},
      data: data
    }) 
    
    if(!signaling) return NextResponse.json({error: "No se ha encontrado la señalización"}, {status: 400})

    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const evaluationData = {
      signaling: {
        percentage: 0,
        emergency_exit: signaling.emergency_exit ? 3 : 0,
        electric_risk: signaling.electric_risk ? 3 : 0,
        fire_extinguisher: signaling.fire_extinguisher ? 3 : 0,
        first_aid_kit: signaling.first_aid_kit ? 3 : 0,
        area_signaling: signaling.area_signaling ? 3 : 0,
        danger_drop: signaling.danger_drop ? 3 : 0,
        no_smoking: signaling.no_smoking ? 3 : 0,
        weapons_prohibition: signaling.weapons_prohibition ? 3 : 0,
      }
    }

    const grade = calculatePercentage(evaluationData.signaling, 8)

    evaluationData.signaling.percentage = grade === 0 ? 0 : grade === 1 ? 3 : 1

    const updatedEvaluation = {
      inspection: {
        ...(typeof evaluation.inspection === 'object' ? evaluation.inspection : {}),
        signaling: evaluationData.signaling.percentage,
        percentage: 0
      }
    }

    updatedEvaluation.inspection.percentage = calculatePercentage(updatedEvaluation.inspection, 5)

    const updateEvaluation = await prisma.evaluations.update({
      where: {company_id: +(query)},
      data: updatedEvaluation
    }) 

    if(!updateEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({message: signaling}, {status: 200, statusText: "Señalizacion Actualizada Correctamente"})

  }catch(error){
    console.log(data)
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}