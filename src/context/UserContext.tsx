"use client"

import { useState } from "react";
import { getSession } from "next-auth/react";
import { createContext } from "react";
import { Session } from "@/types";

type UserContextProps = {
  session: Session
  role: string
  getUserSession: () => Promise<void>
}

type UserProviderProps = {
  children: React.ReactNode
}

export const UserContext = createContext<UserContextProps>(null!);

export const UserProvider = ({children} : UserProviderProps) => {
  const [role, setRole] = useState("")
  
  const [session, setSession] = useState({
    email: "",
    role: ""
  })
  const getUserSession = async () => {
    const session : any = await getSession()
    if(session)
    setSession({
      email: session?.user?.email,
      role: session?.user?.role
    })
    setRole(session?.user?.role)
    return session
  }

  return(
    <UserContext.Provider
      value={{
        session,
        role,
        getUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
