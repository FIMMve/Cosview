import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest){
  const data = await request.json()

  try{
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const companies = await prisma.company.updateMany({
      where: {legal_representative_id: +data?.id},
      data: {
        legal_representative_id: null
      }
    })

    const deleteLR = await prisma.legalRepresentative.delete({
      where: {id: data?.id}
    })

    if(!deleteLR) return NextResponse.json({
      message: "Representante legal no encontrado...",
    },{
      status: 500,
      statusText: "Representante legal no encontrado..."
    })

    return NextResponse.json({
      message: "Representante legal eliminado..."
    },{
      status: 200,
      statusText: "Representante legal eliminado..."
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