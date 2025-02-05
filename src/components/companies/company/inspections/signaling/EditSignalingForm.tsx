"use client"

import { useForm } from "react-hook-form"
import { Button, RadioGroup, Radio } from "@nextui-org/react"
import { useState } from "react"

type EditSignalingFormProps = {
  companyId: number
  getSignaling: (id: number) => Promise<void>
  signaling: any
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditSignalingForm({setEdit, companyId, getSignaling, signaling} : EditSignalingFormProps) {
  const { handleSubmit } = useForm()

  const [currentSignaling, setcurrentSignaling] = useState<any>(signaling)

  const onSubmit = handleSubmit( async () => {
    const res = await fetch(`/api/inspections/update-signaling?query=${companyId}`, {
      method: "PUT",
      body: JSON.stringify(currentSignaling),
      headers: {"Content-Type" : "application/json"}
    })
    if(res.ok){
      getSignaling(companyId)
      setEdit(false)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2"
    >
      <RadioGroup
        label="Salida de Emergencia"
        value={currentSignaling?.emergency_exit ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, emergency_exit: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Riesgo Eléctrico"
        value={currentSignaling?.electric_risk ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, electric_risk: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Extintor de Incendios"
        value={currentSignaling?.fire_extinguisher ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, fire_extinguisher: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Botiquín de Primeros Auxilios"
        value={currentSignaling?.first_aid_kit ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, first_aid_kit: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Señalización de Área"
        value={currentSignaling?.area_signaling ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, area_signaling: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Peligro de Caída"
        value={currentSignaling?.danger_drop ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, danger_drop: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="No Fumar"
        value={currentSignaling?.no_smoking ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, no_smoking: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Prohibición de Armas"
        value={currentSignaling?.weapons_prohibition ? "Tiene" : "No Tiene"}
        onChange={e => setcurrentSignaling({...currentSignaling, weapons_prohibition: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <Button
        size="sm"
        className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  )
}
