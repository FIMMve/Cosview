import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")
  const data = searchParams.get("data")
  try{
    let committee

    if(!query) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})
    
    if(!data){
      committee = await prisma.committee.findUnique({
        where: {company_id: +(query)},
        select: {
          constitution: true,
          delegate_code: true,
          registratrion_date: true,
          inpsasel_report_date: true,
          transcription_date: true,
          ministry_labor_letter: true,
          call_date: true,
          application_date: true,
          election_date: true,
          mutual_agreement: true,
          designation_date: true,
          aceptance_date: true,
          formal_agreement: true,
        }
      })

      if(!committee) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})

      return NextResponse.json({message: committee}, {status: 200, statusText: "Comité Encontrado"})
    }

    if(data === "center" || data === "delegate" || data === "committee"){
      committee = await prisma.committee.findUnique({
        where: {company_id: +(query)},
        select: {
          center_certificate: data === "center",
          delegate_certificate: data === "delegate",
          committee_certificate: data === "committee"
        }
      })

      if(!committee) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})

      return NextResponse.json({message: committee}, {status: 200, statusText: "Comité Encontrado"})
    }

    if(data === "credentials"){
      committee = await prisma.committee.findUnique({
        where: {company_id: +(query)},
        select: {
          inpsasel_email: true,
          inpsasel_password: true,
        }
      })

      if(!committee) return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})

      return NextResponse.json({message: committee}, {status: 200, statusText: "Comité Encontrado"})      
    }

    return NextResponse.json({error: "No se ha encontrado el comité"}, {status: 400})
  }catch(error){
    console.log(error)
    return NextResponse.json({error: error as Error},{status: 500})
  }
}