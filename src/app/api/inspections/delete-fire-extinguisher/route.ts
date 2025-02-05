import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest){
  const data = await request.json()

  try{
    const deleteFE = await prisma.fireExtinguisher.delete({
      where: {id: data?.id}
    })

    if(!deleteFE) return NextResponse.json({
      message: "Extintor no encontrado...",
    },{
      status: 500,
      statusText: "Extintor no encontrado..."
    })

    return NextResponse.json({
      message: "Extintor eliminado..."
    },{
      status: 200,
      statusText: "Extintor eliminado..."
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