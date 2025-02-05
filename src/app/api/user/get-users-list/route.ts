import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(request : any){
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

  const users = await prisma.user.findMany()
  if(!users) NextResponse.json({
    error: "Error al obtener usuarios..."
  }, 
  {
    status: 500, 
    statusText: "Error al obtener usuarios..."
  })

  return NextResponse.json({
    users: users
  },{
    status: 200,
    statusText: "Usuarios obtenidos..."
  })
}