import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(){
  try {
    const project = await prisma.project.createMany({
      data: [
        {id: 1,start: "2021-09-01", end: "2022-09-01"},
        {id: 2,start: "2021-09-01", end: "2022-09-01"},
        {id: 3,start: "2021-09-01", end: "2022-09-01"},
        {id: 4,start: "2021-09-01", end: "2022-09-01"},
        {id: 5,start: "2021-09-01", end: "2022-09-01"},
        {id: 6,start: "2021-09-01", end: "2022-09-01"},
        {id: 7,start: "2021-09-01", end: "2022-09-01"},
        {id: 8,start: "2021-09-01", end: "2022-09-01"},
        {id: 9,start: "2021-09-01", end: "2022-09-01"},
        {id: 10,start: "2021-09-01", end: "2022-09-01"},
        {id: 11,start: "2021-09-01", end: "2022-09-01"},
        {id: 12,start: "2021-09-01", end: "2022-09-01"},
        {id: 13,start: "2021-09-01", end: "2022-09-01"},
        {id: 14,start: "2021-09-01", end: "2022-09-01"},
        {id: 15,start: "2021-09-01", end: "2022-09-01"},
        {id: 16,start: "2021-09-01", end: "2022-09-01"},
        {id: 17,start: "2021-09-01", end: "2022-09-01"},
        {id: 18,start: "2021-09-01", end: "2022-09-01"},
        {id: 19,start: "2021-09-01", end: "2022-09-01"},
      ]
    })

    if(!project) return NextResponse.json({error: "Error al inicializar el proyecto"}, {status: 400})

    return NextResponse.json({
      message: "Proyecto inicializado..."
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