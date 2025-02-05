import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function DELETE(request : any){
  const data = await request.json()

  try{
    const employees = await prisma.employeeRecord.findMany({
      where: {company_id: +(data?.id)}
    })
    if(employees){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deleteEmployees = await prisma.employeeRecord.deleteMany({
        where: {company_id: +(data?.id)}
      })
    }

    const evaluations = await prisma.evaluations.findUnique({
      where: {company_id: +(data?.id)}
    })
    if(evaluations){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deleteEmployees = await prisma.evaluations.deleteMany({
        where: {company_id: +(data?.id)}
      })
    }

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const employeeRecord = await prisma.employeeRecord.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const committee = await prisma.committee.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const evaluation = await prisma.evaluations.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sysl = await prisma.sysl.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const inspection = await prisma.inspection.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fisrtAid = await prisma.firstAid.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const electricalPrevention = await prisma.electricalPrevention.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signaling = await prisma.signaling.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fireExtinguisher = await prisma.fireExtinguisher.deleteMany({where: {company_id: +data?.id}})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const capacitation = await prisma.capacitation.deleteMany({where: {company_id: +data?.id}})
    
    const deleteCompany = await prisma.company.delete({
      where: {id: parseInt(data?.id)}
    })
    
    if(!deleteCompany) NextResponse.json({
      error: "Error al eliminar empresa..."
    }, 
    {
      status: 500, 
      statusText: "Error al eliminar empresa..."
    })
  
    return NextResponse.json({
      message: "Empresa eliminada..."
    },{
      status: 200,
      statusText: "Empresa eliminada..."
    })

  }catch(error){
    console.log(error)
    return NextResponse.json({
      error: (error as Error)
    },{
      status: 500
    })
  }
}