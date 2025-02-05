import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

type UpdatedData = {
  name?: string
  company_name?: string
  rif?: string
  phone_number?: string
  address?: string
  economyc_activity?: string
  img?: string
  email?: string[]
  zone?: string
  code?: string
  nil?: string
  ivss?: string
  inces?: string
  section?: string
  legal_representative_id?: number
  committee_delegate?: boolean
  committee_second_postulate?: boolean
  committee_elections?: boolean
}

export async function PUT(request : NextRequest){
  const data = await request.json()
  try {
    const updatedData : UpdatedData = {}
    if (data.data.name) updatedData.name = data.data.name;
    if (data.data.company_name) updatedData.company_name = data.data.company_name;
    if (data.data.rif) updatedData.rif = data.data.rif;
    if (data.data.phone_number) updatedData.phone_number = data.data.phone_number;
    if (data.data.address) updatedData.address = data.data.address;
    if (data.data.economyc_activity) updatedData.economyc_activity = data.data.economyc_activity;
    if (data.data.img) updatedData.img = data.data.img;
    if (data.data.email) updatedData.email = data.data.email;
    if (data.data.zone) updatedData.zone = data.data.zone;
    if (data.data.code) updatedData.code = data.data.code;
    if (data.data.nil) updatedData.nil = data.data.nil;
    if (data.data.ivss) updatedData.ivss = data.data.ivss;
    if (data.data.inces) updatedData.inces = data.data.inces;
    if (data.data.section) updatedData.section = data.data.section;
    if (data.data.legal_representative_id) updatedData.legal_representative_id = +(data.data.legal_representative_id);
    if (data.data.committee_delegate) updatedData.committee_delegate = data.data.committee_delegate;
    if (data.data.committee_second_postulate) updatedData.committee_second_postulate = data.data.committee_second_postulate;
    if (data.data.committee_elections) updatedData.committee_elections = data.data.committee_elections;

    const updateCompany = await prisma.company.update({
      where: {id: data.data?.id},
      data: updatedData
    })
    if(!updateCompany) NextResponse.json({
      error: "Error al actualizar empresa..."
    }, 
    {
      status: 500, 
      statusText: "Error al actualizar empresa..."
    })
    
    return NextResponse.json({
      message: "Empresa actualizada..."
    },{
      status: 200,
      statusText: "Empresa actualizada..."
    })
  } catch (error) {
    return NextResponse.json({
      error: error as Error
    },{
      status: 500,
    })
  }

}