import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { calculatePercentage, calculatePunctuation } from "@/app/utils/evaluations";

export async function PUT(request: NextRequest){
  const data = await request.json()
  try{
    delete data.company_id

    let updatedEmployee
    if(!data.termination_date){
      delete data.termination_date

      updatedEmployee = await prisma.employeeRecord.update({
        where: {
          id: +(data?.id)
        },
        data: data
      })
    }else{
      updatedEmployee = await prisma.employeeRecord.update({
        where: {
          id: +(data?.id)
        },
        data: data
      })
    }

    const employeeList = await prisma.employeeRecord.findMany({
      where: {
        company_id: +(updatedEmployee.company_id)
      }
    })
    
    const evaluationData = {
      employee_record: {
        percentage: 0,
        route_format: 0,
        prevention_principles: 0,
        rutagrama: 0,
      }
    }
    
    employeeList.map(employee => {
      if(!employee.termination_date){
        evaluationData.employee_record.route_format += (employee.route_format ? 1 : 0)
        evaluationData.employee_record.prevention_principles += (employee.prevention_principles ? 1 : 0)
        evaluationData.employee_record.rutagrama += (employee.rutagrama ? 1 : 0)
      }
    })

    const length = employeeList.filter(employee => !employee.termination_date).length
    const { route_format, prevention_principles, rutagrama } = evaluationData.employee_record

    evaluationData.employee_record = {
      percentage: 0,
      route_format: calculatePunctuation(route_format, length),
      prevention_principles: calculatePunctuation(prevention_principles, length),
      rutagrama: calculatePunctuation(rutagrama, length),
    }    
    
    evaluationData.employee_record.percentage = calculatePercentage(evaluationData.employee_record, 3)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedPunctuation = await prisma.evaluations.update({
      where: {company_id: +(updatedEmployee.company_id) },
      data: evaluationData
    })

    return NextResponse.json({
      message: updatedEmployee
    },{
      status: 200,
      statusText: "Empleado actualizado..."
    })

  }catch(error){
    console.log(data)
    console.log(error)
    return NextResponse.json({
      error: error as Error
    },{
      status: 500
    })
  }
}