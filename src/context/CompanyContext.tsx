import { CompanyData } from "@/types"
import { useState } from "react"
import { createContext } from "react"

type CompanyContextProps = {
  company: Data[]
  img: string
  email: string[]
  companyData: CompanyData
  getSingleCompany: (id: number) => Promise<void>
  updateCompany: (data: any) => Promise<Response>
}

type CompanyProviderProps = {
  children: React.ReactNode
}

type Data = {
  key: string,
  value: string | number | string[]
}

export const CompanyContext = createContext<CompanyContextProps>(null!);

export const CompanyProvider = ({children} : CompanyProviderProps) => {
  const [company, setCompany] = useState<Data[]>([])
  const [companyData, setCompanyData] = useState<CompanyData>({} as CompanyData)
  const [img, setImg] = useState<string>("")
  const [email, setEmail] = useState<string[]>([])

  const getSingleCompany = async (id : number) => {
    const res = await fetch(`/api/company/get-companies?query=${id}`, {
      method: "GET"
    })
    const data = await res.json()
    if(res.ok){
      const company = data.company
      setCompanyData(company) 
      setEmail(company.email)
      setCompany([
        {key: "Centro de Trabajo", value: company.name},
        {key: "Razón Social", value: company.company_name},
        {key: "Actividad Económica", value: company.economyc_activity},
        {key: "Número Telefónico", value: company.phone_number},
        {key: "Correo Electrónico", value: email},
        {key: "RIF", value: company.rif},
        {key: "NIL", value: company.nil},
        {key: "IVSS", value: company.ivss},
        {key: "INCES", value: company.inces},
        {key: "Zona", value: company.zone},
        {key: "Sección", value: company.section},
        {key: "Código", value: company.code},
        {key: "Dirección", value: `${company.address?.address}, ${company.address?.parish}, ${company.address?.municipality}, ${company.address?.state}`},
      ])
      setImg(company.img)
    }
  }

  const updateCompany = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await fetch("/api/company/update-company", {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    return res
  }

  return(
    <CompanyContext.Provider
      value={{
        company,
        img,
        email,
        companyData,
        getSingleCompany,
        updateCompany
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
