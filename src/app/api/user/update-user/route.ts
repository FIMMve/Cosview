import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function PUT(request: NextRequest){
  const data = await request.json()
  const session = await getServerSession({req: request, ...authOptions})

  try{
    if(!session){
      return NextResponse.json({
        error: "No autorizado..."
      }, 
      {
        status: 401, 
        statusText: "No autorizado..."
      })
    }

    const currentUser = await prisma.user.findFirst({
      where: {id: data?.id}
    })

    if(currentUser?.username === data.username) delete data.username
    if(currentUser?.id_number === data.id_number) delete data.id_number
    if(currentUser?.email === data.email) delete data.email
    if(currentUser?.phone_number === data.phone_number) delete data.phone_number

    const updateUser = await prisma.user.update({
      where: {id: data?.id},
      data: {
        username: data?.username,
        id_number: data?.id_number,
        email: data?.email,
        phone_number: data?.phone_number,
      }
    })
    console.log(data)
    console.log(updateUser)
    if(!updateUser) NextResponse.json({
      error: "Error al actualizar usuario..."
    }, 
    {
      status: 500, 
      statusText: "Error al actualizar usuario..."
    })
  
    return NextResponse.json({
      message: "Usuario actualizado..."
    },{
      status: 200,
      statusText: "Usuario actualizado..."
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