import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest){
  const data = await request.json()

  try{
    const event = await prisma.events.delete({
      where: {id: data?.id}
    })

    if(!event) return NextResponse.json({
      message: "Evento no encontrado...",
    },{
      status: 500,
      statusText: "Evento no encontrado.."
    })

    return NextResponse.json({
      message: "Evento eliminado..."
    },{
      status: 200,
      statusText: "Evento eliminado..."
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