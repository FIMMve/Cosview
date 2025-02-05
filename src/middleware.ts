import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest){
  const token = await getToken({req})
  if(!token) return NextResponse.redirect(new URL("/", req.url))
  
  if(token.role === "user"){
    if(!req.nextUrl.pathname.startsWith("/dashboard")) return NextResponse.redirect(new URL("/dashboard", req.url))
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/manage-users/:path*", 
    "/companies/:path*",
  ]
}