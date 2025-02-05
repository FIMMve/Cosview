import { calculatePercentage, calculatePunctuation } from "@/app/utils/evaluations";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest){
  const data = await request.json()

  try{
    const idNumberExists = await prisma.employeeRecord.findUnique({
      where: { id_number: data.id_number }
    })
    if(idNumberExists){
      return NextResponse.json({ 
        message: "Ya existe un empleado con el mismo número de cédula..." 
      },{
        status: 400,
        statusText: "Ya existe un empleado con el mismo numero de cedula..."
      })
    }

    const phoneNumberExists = await prisma.employeeRecord.findUnique({
      where: { phone_number: data.phone_number }
    })
    if(phoneNumberExists){
      return NextResponse.json({ 
        message: "Ya existe un empleado con el mismo número telefónico..." 
      },{
        status: 400,
        statusText: "Ya existe un empleado con el mismo numero telefonico..."
      })
    }

    const committee = await prisma.committee.findUnique({
      where: {company_id: +(data.company_id)}
    })

    let newEmployee

    if(data.termination_date === null){
      newEmployee = await prisma.employeeRecord.create({ 
        data: {
          company_id: +(data.company_id),
          name: data.name,
          id_number: data.id_number,
          phone_number: data.phone_number,
          gender: data.gender,
          position: data.position,
          preventionRepresentative: data.preventionRepresentative,
          employeerRepresentative: data.employeerRepresentative,
          birthdate: data.birthdate,
          hire_date: data.hire_date,
          status: data.status,
          route_format: data.route_format,
          prevention_principles: data.prevention_principles,
          rutagrama: data.rutagrama,
          committee_delegate: data.committee_delegate,
          committee_second_postulate: data.committee_second_postulate,
          committee_elections: data.committee_elections,
          committee_id: committee?.id
        }
      })      
    }else{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      newEmployee = await prisma.employeeRecord.create({ 
        data: {
          company_id: +(data.company_id),
          name: data.name,
          id_number: data.id_number,
          phone_number: data.phone_number,
          gender: data.gender,
          position: data.position,
          preventionRepresentative: data.preventionRepresentative,
          employeerRepresentative: data.employeerRepresentative,
          birthdate: data.birthdate,
          hire_date: data.hire_date,
          termination_date: data.termination_date,
          status: data.status,
          route_format: data.route_format,
          prevention_principles: data.prevention_principles,
          rutagrama: data.rutagrama,
          committee_delegate: data.committee_delegate,
          committee_second_postulate: data.committee_second_postulate,
          committee_elections: data.committee_elections,
          committee_id: committee?.id
        }
      })
    }

    const employeeList = await prisma.employeeRecord.findMany({
      where: {
        company_id: +(data.company_id)
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
      evaluationData.employee_record.route_format += (employee.route_format ? 1 : 0)
      evaluationData.employee_record.prevention_principles += (employee.prevention_principles ? 1 : 0)
      evaluationData.employee_record.rutagrama += (employee.rutagrama ? 1 : 0)
    })
    
    const length = employeeList.length
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
      where: {company_id: +(data.company_id) },
      data: evaluationData
    })

    return NextResponse.json({
      message: "Empleado Agregado..."
    },{
      status: 200,
    })
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}