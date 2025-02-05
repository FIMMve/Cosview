"use client"

import { useEffect, useState } from "react"
import type { LegalRepresentative } from "@/types"
import LegalRepresentativeEdit from "./LegalRepresentativeEdit"
import CardTemplate from "../CardTemplate"
import { useCompany } from "@/hooks/useCompany"

type LegalRepresentativeDataProps = {
  id: number
}

export default function LegalRepresentativeData({ id } : LegalRepresentativeDataProps) {
  const { updateCompany } = useCompany()
  const [edit, setEdit] = useState(false)
  const [legalRepresentative, setLegalRepresentative] = useState<LegalRepresentative>({} as LegalRepresentative)
  const [legalRepresentatives, setLegalRepresentatives] = useState([] as LegalRepresentative[])

  const getLegalRepresentative = async (id : number) => {
    const res = await fetch(`/api/legal-representative/get-legal-representative?query=${id}`)
    if(res.ok){
      const data = await res.json()
      setLegalRepresentative(data.legalRepresentative)
      setEdit(false)
      return
    }
    setLegalRepresentative({} as LegalRepresentative)
  }

  const getLegalRepresentativeById = async (id : number) => {
    const res = await fetch(`/api/legal-representative/get-legal-representative?id=${id}`)
    if(res.ok){
      const data = await res.json()
      setLegalRepresentative(data.legalRepresentative)
      return
    }
    setLegalRepresentative({} as LegalRepresentative)
  }

  const getLegalRepresentatives = async () => {
    const res = await fetch(`/api/legal-representative/get-legal-representative`)
    if(res.ok){
      const data = await res.json()
      setLegalRepresentatives(data.legalRepresentatives)
    }
  }

  const handleSelection = (e : any) => {
    const data = {id: +(id), legal_representative_id: +(e.target.value)}
    getLegalRepresentativeById(data.legal_representative_id)
    updateCompany(data)
    setEdit(false)
  }

  useEffect(() => {
    getLegalRepresentative(id)
    getLegalRepresentatives()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CardTemplate 
      data={[
        {key: "Nombre", value: legalRepresentative.name},
        {key: "Número de Cédula", value: legalRepresentative.id_number},
        {key: "Número Telefónico", value: legalRepresentative.phone_number}
      ]} 
      title="Representante Legal" 
      edit={edit}
      setEdit={setEdit}
      isEditable={true}
    >
      <div className="print:hidden">
        <LegalRepresentativeEdit setEdit={setEdit} id={id} legalRepresentatives={legalRepresentatives} getLegalRepresentative={getLegalRepresentative} handleSelection={handleSelection} legalRepresentative={legalRepresentative} setLegalRepresentative={setLegalRepresentative}/>
      </div>
    </CardTemplate>    
  )
}
