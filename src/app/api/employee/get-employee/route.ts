import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try{
    if(query){
      const employees = await prisma.employeeRecord.findMany({
        where: {
          company_id: +(query)
        }
      })
      if(!employees) NextResponse.json({
        error: "Error al obtener la lista de empleados..."
      },{
        status: 500
      })
  
      return NextResponse.json({
        message: employees
      },{
        status: 200
      })
    }

  }catch(error){
    console.error(error)
    return NextResponse.json({
      error: error as Error
    },{
      status: 500
    })
  }
}