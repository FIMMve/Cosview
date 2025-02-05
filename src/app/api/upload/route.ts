import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary';
import { env } from "process";

export async function POST(request : any) {
  const data = await request.formData()
  const file : any = data.get("file")
  if(!file) return NextResponse.json("No se ha subido ningun archivo", {status: 400})

  cloudinary.config({ 
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const response : any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
    }, (error, result) => {
      if(error) reject(error)

      resolve(result)
    }).end(buffer)
  })

  return NextResponse.json({ 
    message: "Imagen subida correctamente",
    url: response.secure_url
  })
}