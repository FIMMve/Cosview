import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest){
  const data = await request.json()
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  console.log(data)
  try{
    if(!query) return NextResponse.json({
      error: "No se ha podido actualizar la evaluación"
    },{
      status: 400
    })

    const evaluation = await prisma.evaluations.update({
      where: {
        company_id: +(query)
      },
      data: {
        reference_date: data.reference_date,
      }
    })

    if(!evaluation) return NextResponse.json({
      error: "No se ha podido actualizar la evaluación"
    },{
      status: 400
    })

    return NextResponse.json({
      error: "Evaluación Actualizada con éxito"
    },{
      status: 200
    })

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: (error as Error).message,
    },{
      status: 500
    });
  }
}