import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest){
  const data = await request.json()

  try{
    const event = await prisma.events.create({data: data})

    if(!event) return NextResponse.json({error: "Error al agregar el evento"}, {status: 400})
    
    return NextResponse.json({
      message: "Evento Agregado..."
    },{
      status: 200,
    })

  }catch(error){
    console.log(data)
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}