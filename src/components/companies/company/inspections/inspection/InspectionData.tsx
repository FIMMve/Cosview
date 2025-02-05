"use client"

import { useEffect, useState } from "react";
import CardTemplate from "../../CardTemplate";
import InspectionEdit from "./InspectionEdit";

type InspectionDataProps = {
  companyId: number
}

export default function InspectionData({companyId} : InspectionDataProps) {
  const [edit, setEdit] = useState(false)
  const [inspection, setInspection] = useState<any>({})
  const [data, setData] = useState<any>([])

  const getInspection = async (id: number) => {
    const res = await fetch(`/api/inspections/get-inspection?query=${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application-json"
      }
    })

    if(res.ok){
      const data = await res.json()
      setInspection(data.message)
    }
  }

  useEffect(() => {
    getInspection(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(inspection) setData([
      {key: "Inspector", value: inspection.inspector_name},
      {key: "Fecha", value: inspection.inspection_date},
      {key: "", value: inspection.inspection_notes},
    ])
  }, [inspection])

  return (
    <CardTemplate
      title="Observaciones de la Inspección"
      data={data}
      isEditable
      edit={edit}
      setEdit={setEdit}
    >
      <InspectionEdit inspection={inspection} companyId={companyId} getInspection={getInspection} edit={edit} setEdit={setEdit} />
    </CardTemplate>
  )
}
