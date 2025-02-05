import { calculatePercentage } from "@/app/utils/evaluations";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const query = req.nextUrl.searchParams.get("query")
  try{
    if(!query) return NextResponse.json({error: "No se ha encontrado la prevencion electrica"}, {status: 400})

    const ep = await prisma.electricalPrevention.update({
      where: {company_id: +(query)},
      data: data
    }) 
    
    if(!ep) return NextResponse.json({error: "No se ha encontrado la prevencion electrica"}, {status: 400})

    const evaluation = await prisma.evaluations.findFirst({ where: { company_id: +(query) } })

    if(!evaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    const evaluationData = {
      ep: {
        percentage: 0,
        emergency_exit: ep.emergency_lights === null ? 0 : +ep.emergency_lights > 0 ? 3 : 0,
        electric_risk: ep.operative_lights === null ? 0 : ep.operative_lights ? 3 : 0,
        fire_extinguisher: ep.electric_generator ? 3 : 0,
        first_aid_kit: ep.solar_panel ? 3 : 0,
        area_signaling: ep.emergency_batteries ? 3 : 0,
      }
    }

    const grade = calculatePercentage(evaluationData.ep, 5)

    evaluationData.ep.percentage = grade === 0 ? 0 : grade === 1 ? 3 : 1

    const updatedEvaluation = {
      inspection: {
        ...(typeof evaluation.inspection === 'object' ? evaluation.inspection : {}),
        electrical_prevention: evaluationData.ep.percentage,
        percentage: 0
      }
    }

    updatedEvaluation.inspection.percentage = calculatePercentage(updatedEvaluation.inspection, 5)

    const updateEvaluation = await prisma.evaluations.update({
      where: {company_id: +(query)},
      data: updatedEvaluation
    }) 

    if(!updateEvaluation) return NextResponse.json({error: "Error al actualizar la evaluación"}, {status: 400})

    return NextResponse.json({message: ep}, {status: 200, statusText: "Prevencion Electrica Actualizada Correctamente"})

  }catch(error){
    console.log(data)
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}