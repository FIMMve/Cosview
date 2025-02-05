"use client"

import { useEffect, useState } from "react";
import CardTemplate from "../../CardTemplate";
import EditSignalingForm from "./EditSignalingForm";

type SignalingDataProps = {
  companyId: number
}

export default function SignalingData({companyId} : SignalingDataProps) {
  const [edit, setEdit] = useState(false)

  const [data, setData] = useState<any>([])
  const [signaling, setSignaling] = useState<any>()
  
  const getSignaling = async (id: number) => {
    const res = await fetch(`/api/inspections/get-signaling?query=${id}`,{
      method: "GET",
      headers: {"Content-Type" : "application/json"}	
    })
    const data = await res.json()
    setSignaling(data.message)
  }

  useEffect(() => {
    getSignaling(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData([
      {key: "Salida de Emergencia", value: signaling?.emergency_exit ? "Tiene" : "Falta", warning: !signaling?.emergency_exit},
      {key: "Riesgo Eléctrico", value: signaling?.electric_risk ? "Tiene" : "Falta", warning: !signaling?.electric_risk},
      {key: "Extintor de Incendios", value: signaling?.fire_extinguisher ? "Tiene" : "Falta", warning: !signaling?.fire_extinguisher},
      {key: "Botiquín de Primeros Auxilios", value: signaling?.first_aid_kit ? "Tiene" : "Falta", warning: !signaling?.first_aid_kit},
      {key: "Señalización de Área", value: signaling?.area_signaling ? "Tiene" : "Falta", warning: !signaling?.area_signaling},
      {key: "Peligro de Caída", value: signaling?.danger_drop ? "Tiene" : "Falta", warning: !signaling?.danger_drop},
      {key: "No Fumar", value: signaling?.no_smoking ? "Tiene" : "Falta", warning: !signaling?.no_smoking},
      {key: "Prohibición de Armas", value: signaling?.weapons_prohibition ? "Tiene" : "Falta", warning: !signaling?.weapons_prohibition},
    ])
  }, [signaling])

  return (
    <>
      <CardTemplate
        data={data}
        title="Señalización"
        edit={edit}
        setEdit={setEdit}
        isEditable={true}
      >
        <EditSignalingForm setEdit={setEdit} companyId={companyId} getSignaling={getSignaling} signaling={signaling} />
      </CardTemplate>
    </>
  )
}
