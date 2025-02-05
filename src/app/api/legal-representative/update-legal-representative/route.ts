import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function PUT(request : any){
  const data = await request.json()
  try {
    const legalRepresentative = await prisma.legalRepresentative.findFirst({
      where: {id: data.id}
    })

    if(!legalRepresentative) NextResponse.json({
      error: "Error al actualizar representante legal..."
    }, 
    {
      status: 500, 
      statusText: "Error al actualizar representante legal..."
    })

    if(legalRepresentative?.id_number === data.id_number) delete data.id_number
    if(legalRepresentative?.name === data.name) delete data.name
    if(legalRepresentative?.phone_number === data.phone_number) delete data.phone_number

    const updateLegalRepresentative = await prisma.legalRepresentative.update({
      where: {id: data.id},
      data: data
    })

    if(!updateLegalRepresentative) NextResponse.json({
      error: "Error al actualizar representante legal..."
    }, 
    {
      status: 500, 
      statusText: "Error al actualizar representante legal..."
    })

    return NextResponse.json({
      message: "Representante legal actualizado..."
    },{
      status: 200,
      statusText: "Representante legal actualizado..."
    })
  } catch (error) {
    return NextResponse.json({
      error: error as Error
    },{
      status: 500,
    })
  }

}