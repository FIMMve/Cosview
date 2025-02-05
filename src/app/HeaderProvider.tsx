"use client"

import { UserProvider } from "@/context/UserContext"
import { SessionProvider } from "next-auth/react"

export function HeaderProvider({children} : {children: React.ReactNode}){
  return(
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  )
}