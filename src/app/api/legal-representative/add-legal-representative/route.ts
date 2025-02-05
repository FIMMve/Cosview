import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request : NextRequest){
  const data = await request.json()
  try{

    const legalRepresentativeExists = await prisma.legalRepresentative.findUnique({
      where: {
        id_number: data.id_number
      }
    })
    if(legalRepresentativeExists){
      return NextResponse.json({
        error: "El representante legal ya existe..."
      },{
        status: 400,
        statusText: "El representante legal ya existe..."
      })
    }

    const newLegalRepresentative = await prisma.legalRepresentative.create({ 
      data: {
        name: data.name,
        id_number: data.id_number,
        phone_number: data.phone_number
    } })

    const letalRepresentative = await prisma.legalRepresentative.findUnique({
      where: { id_number: data.id_number }
    })

    const updatedCompany = await prisma.company.update({
      where: { id: +(data.company_id) },
      data: {
        legal_representative_id: letalRepresentative?.id
      }
    })

    return NextResponse.json({newLegalRepresentative, updatedCompany})

  }catch(error){
    console.log(error)
    console.log(data)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}