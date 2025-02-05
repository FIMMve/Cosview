import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest){
  const data = await request.json()

  try{
    delete data.createdAt
    delete data.updatedAt
    
    const updatedEvent = await prisma.events.update({
      where: {
        id: +(data?.id)
      },
      data: data
    })

    if(!updatedEvent) return NextResponse.json({error: "Error al actualizar el evento"}, {status: 400})

    return NextResponse.json({
      message: "Evento editado..."
    },{
      status: 200,
    })

  }catch(error){
    console.log(error)
    return NextResponse.json({
      error: error as Error
    },{
      status: 500
    })
  }
}