"use client"

import { useEffect, useState } from "react";
import CardTemplate from "../../CardTemplate";
import EditEPForm from "./EditEPForm";

type SignalingDataProps = {
  companyId: number
}

export default function EPData({companyId} : SignalingDataProps) {
  const [edit, setEdit] = useState(false)

  const [data, setData] = useState<any>([])
  const [EP, setEP] = useState<any>()
  
  const getEP = async (id: number) => {
    const res = await fetch(`/api/inspections/get-electrical-prevention?query=${id}`,{
      method: "GET",
      headers: {"Content-Type" : "application/json"}	
    })
    const data = await res.json()
    setEP(data.message)
  }

  useEffect(() => {
    getEP(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData([
      {key: "Luces de Emergencia", value: EP?.emergency_lights, warning: EP?.emergency_lights === 0},
      {key: "Luces Operativas", value: EP?.operative_lights, warning: EP?.operative_lights === 0},
      {key: "Generador Eléctrico", value: EP?.electric_generator ? "Tiene" : "Falta", warning: !EP?.electric_generator},
      {key: "Panel Solar", value: EP?.solar_panel ? "Tiene" : "Falta", warning: !EP?.solar_panel},
      {key: "Baterías de Emergencia", value: EP?.emergency_batteries ? "Tiene" : "Falta", warning: !EP?.emergency_batteries},
    ])
  }, [EP])

  return (
    <>
      <CardTemplate
        data={data}
        title="Prevención Eléctrica"
        edit={edit}
        setEdit={setEdit}
        isEditable={true}
      >
        <EditEPForm setEdit={setEdit} companyId={companyId} getEP={getEP} EP={EP} />
      </CardTemplate>
    </>
  )
}
