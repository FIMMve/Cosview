import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest){
  const data = await request.json()

  try{
    const capacitation = await prisma.capacitation.delete({
      where: {id: data?.id}
    })

    if(!capacitation) return NextResponse.json({
      message: "Capacitacion no encontrada...",
    },{
      status: 500,
      statusText: "Capacitacion no encontrada.."
    })

    return NextResponse.json({
      message: "Capacitacion eliminada..."
    },{
      status: 200,
      statusText: "Capacitacion eliminada..."
    })

  }catch(error){
    console.log(error)
    return NextResponse.json({
      error: (error as Error)
    },{
      status: 500
    })
  }
}