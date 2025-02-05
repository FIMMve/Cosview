"use client"

import { useEffect, useState } from "react"
import AddCompany from "@/components/companies/add-company/AddCompany"
import type { CompanyData } from "@/types"
import CompanyCard from "@/components/companies/company/CompanyCard"
import { CompanyProvider } from "@/context/CompanyContext"
import { Input } from "@nextui-org/react"
import SearchIcon from "@/components/icons/SearchIcon"

export default function Companies() {
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [search, setSearch] = useState("")

  const getCompanies = async () => {
    const res = await fetch("/api/company/get-companies")
    if(res.ok){
      const data = await res.json()
      setCompanies(data.companies)
    }
    return res
  }
  
  useEffect(() => {
    getCompanies()
    
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-5 items-center justify-center">
        <Input 
          size="sm"
          className="w-full md:w-6/12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endContent={<SearchIcon />}
        />
        <CompanyProvider>
          <AddCompany getCompanies={getCompanies} />
        </CompanyProvider>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {companies?.filter((company) => company.name.toLowerCase().includes(search.toLowerCase())).map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  )
}
