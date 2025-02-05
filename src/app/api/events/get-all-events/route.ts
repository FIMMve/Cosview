import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
  try{
    const events = await prisma.events.findMany()
    
    if(!events) return NextResponse.json({error: "No se ha encontrado los eventos"}, {status: 400})
    
    return NextResponse.json({message: events}, {status: 200, statusText: "Eventos encontrados correctamente"})
    
  }catch(error){
    console.log(error)
    return NextResponse.json({
      message: (error as Error)
    },{
      status: 500
    })
  }
}