"use client"

import { useForm } from "react-hook-form"
import { Button, RadioGroup, Input, Radio } from "@nextui-org/react"
import { useState } from "react"

type EditEPFormProps = {
  companyId: number
  getEP: (id: number) => Promise<void>
  EP: any
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditEPForm({setEdit, companyId, getEP, EP} : EditEPFormProps) {
  const { handleSubmit } = useForm()

  const [currentEP, setCurrentEP] = useState<any>(EP)

  const onSubmit = handleSubmit( async () => {
    const res = await fetch(`/api/inspections/update-electrical-prevention?query=${companyId}`, {
      method: "PUT",
      body: JSON.stringify(currentEP),
      headers: {"Content-Type" : "application/json"}
    })
    if(res.ok){
      getEP(companyId)
      setEdit(false)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2"
    >
      <Input
        label="Luces de Emergencia"
        type="number"
        value={currentEP?.emergency_lights}
        onChange={e => setCurrentEP({...currentEP, emergency_lights: +e.target.value})}
      />

      <Input
        label="Luces Operativas"
        type="number"
        value={currentEP?.operative_lights}
        onChange={e => setCurrentEP({...currentEP, operative_lights: +e.target.value})}
      />

      <RadioGroup
        label="Generador Eléctrico"
        value={currentEP?.electric_generator ? "Tiene" : "No Tiene"}
        onChange={e => setCurrentEP({...currentEP, electric_generator: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Panel Solar"
        value={currentEP?.solar_panel ? "Tiene" : "No Tiene"}
        onChange={e => setCurrentEP({...currentEP, solar_panel: e.target.value === "Tiene"})}
        orientation="horizontal"
      >
        <Radio key="Tiene" value="Tiene">Tiene</Radio>
        <Radio key="No Tiene" value="No Tiene">No Tiene</Radio>
      </RadioGroup>

      <RadioGroup
        label="Baterías de Emergencia (3h)"
        value={currentEP?.emergency_batteries ? "Tiene" : "No Tiene"}
        onChange={e => setCurrentEP({...currentEP, emergency_batteries: e.target.value === "Tiene"})}
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
