import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request : any){
  const data = await request.json()
  try{
    const companyExists = await prisma.company.findUnique({
      where: {
        company_name: data.company_name
      }
    })
    if(companyExists){
      return NextResponse.json({
        error: "La empresa ya existe..."
      },{
        status: 400,
        statusText: "La empresa ya existe..."
      })
    }

    const newCompany = await prisma.company.create({ data })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newEvaluation = await prisma.evaluations.create({
      data: {
        company_id: +(newCompany.id),
        inspection: {
          percentage: 0,
          observation: 0,
          first_aids: 0,
          electrical_prevention: 0,
          signaling: 0,
          fire_extinguisher: 0
        }
      }
    })
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newCommittee = await prisma.committee.create({
      data: {company_id: +(newCompany.id)}
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const inspection = await prisma.inspection.create({data: {company_id: +newCompany.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firstAid = await prisma.firstAid.create({data: {company_id: +newCompany.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const electricalPrevention = await prisma.electricalPrevention.create({data: {company_id: +newCompany.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signaling = await prisma.signaling.create({data: {company_id: +newCompany.id}})

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newSysl = await prisma.sysl.create({
      data: {
        company_id: +(newCompany.id),
        folder: {
          percentage: 0,
          community_contract: "no cumple",
          service_certificate: "no cumple",
          inspectors_certificate: "no cumple",
          service_organigram: "no cumple",
          standards: "no cumple",
          sysl_policies: "no cumple",
          job_analysis: "no cumple",
          intervention_protocol: "no cumple",
        },
        active_pause: {
          first: {
            date: null,
            hour: null
          },
          second: {
            date: null,
            hour: null
          }
        },
        integration_dynamics: {
          date: null,
          hour: null
        },
        brain_gymnastics: {
          date: null,
          hour: null
        }
      }
    })

    return NextResponse.json({newCompany})

  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}