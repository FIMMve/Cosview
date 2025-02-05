import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(request : any){
  const data = await request.json()
  try {
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    })
    if(usernameExists){
      return NextResponse.json({
        error: "El nombre de usuario ya existe..."
      },{
        status: 400,
        statusText: "El nombre de usuario ya existe..."
      })
    }

    const idNumberExists = await prisma.user.findUnique({
      where: {
        id_number: data.id_number
      }
    })
    if(idNumberExists){
      return NextResponse.json({
        error: "La cedula ya existe..."
      },{
        status: 400,
        statusText: "La cedula ya existe..."
      })
    }

    const emailExists = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if(emailExists){
      return NextResponse.json({
        error: "El email ya existe..."
      },{
        status: 400,
        statusText: "El email ya existe..."
      })
    }

    const phoneNumberExists = await prisma.user.findUnique({
      where: {
        phone_number: data.phone_number
      }
    })
    if(phoneNumberExists){
      return NextResponse.json({
        error: "El numero telefonico ya existe..."
      },{
        status: 400,
        statusText: "El numero telefonico ya existe..."
      })
    }
    
    data.password = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({ data })
    const {password: _, ...user} = newUser
    console.log(_)

    return NextResponse.json(user)

  } catch (error) {
    console.log(error)
    console.log(data)
    return NextResponse.json({
      error: (error as Error)
    },{
      status: 500
    })
  }
}