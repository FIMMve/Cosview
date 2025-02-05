import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest){
  const data = await request.json()

  try{
    const deleteEmployee = await prisma.employeeRecord.delete({
      where: {id: data?.id}
    })

    if(!deleteEmployee) return NextResponse.json({
      message: "Empleado no encontrado...",
    },{
      status: 500,
      statusText: "Empleado no encontrado..."
    })

    return NextResponse.json({
      message: "Empleado eliminado..."
    },{
      status: 200,
      statusText: "Empleado eliminado..."
    })

  }catch(error){
    return NextResponse.json({
      error: (error as Error)
    },{
      status: 500
    })
  }
}