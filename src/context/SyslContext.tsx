"use client"

import { calculatePercentage } from "@/app/utils/evaluations";
import { createContext, useState } from "react";

type SyslContextProps = {
  getSysl: (id: number) => Promise<void>
  sysl: any
  editSysl: (companyId: number, updatedSysl: any, setEdit?: any) => Promise<void>
}

type SyslProviderProps = {
  children: React.ReactNode
}

export const SyslContext = createContext<SyslContextProps>(null!);

export const SyslProvider = ({children} : SyslProviderProps) => {
  const [sysl, setSysl] = useState<any>()

  const getSysl = async (id: number) => {
    const res = await fetch(`/api/sysl/get-sysl?query=${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application-json"
      }
    })

    if(res.ok){
      const data = await res.json()
      setSysl(data.message)
    }
  }

  const editSysl = async (companyId: number, updatedSysl: any, setEdit?: any) => {
    const res = await fetch(`/api/sysl/update-sysl?query=${companyId}`, {
      method: "POST",
      body: JSON.stringify({
        ...updatedSysl,
        folder: {
          ...updatedSysl.folder,
          percentage: calculatePercentage(updatedSysl.folder, 8, "cumple")
        }
      }),
      headers: { "Content-Type" : "application/json"}
    })
    if(res.ok){
      getSysl(companyId)

      if(setEdit) setEdit(false)
    }else{
      alert("Ha ocurrido un error, vuelve a intentarlo...")
    }
  }

  return(
    <SyslContext.Provider
      value={{
        getSysl,
        sysl,
        editSysl
      }}
    >
      {children}
    </SyslContext.Provider>
  )
}
