"use client"

import { UsersListProvider } from "@/context/UsersListContext"

export function Providers ({children} : {children: React.ReactNode}){
  return(
    <UsersListProvider>
      {children}
    </UsersListProvider>
  )
}