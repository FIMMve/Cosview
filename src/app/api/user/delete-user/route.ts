import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function DELETE(request : any){
  const data = await request.json()
  const session = await getServerSession({req: request, ...authOptions})
  if(!session){
    return NextResponse.json({
      error: "No autorizado..."
    }, 
    {
      status: 401, 
      statusText: "No autorizado..."
    })
  }

  const deleteUser = await prisma.user.delete({
    where: {id: data?.id}
  })

  if(!deleteUser) return NextResponse.json({
    error: "Error al eliminar usuario..."
  }, 
  {
    status: 500, 
    statusText: "Error al eliminar usuario..."
  })

  return NextResponse.json({
    message: "Usuario eliminado..."
  },{
    status: 200,
    statusText: "Usuario eliminado..."
  })
}