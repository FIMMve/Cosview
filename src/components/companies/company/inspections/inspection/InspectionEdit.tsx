"use client"

import { dateFormatter } from "@/app/utils/dateFormatter"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { Button, DateInput, Input, Textarea } from "@nextui-org/react"
import { useDateFormatter } from "@react-aria/i18n"
import { useState } from "react"
import { useForm } from "react-hook-form"

type InspectionEditProps = {
  inspection: any
  companyId: number
  getInspection: (id: number) => Promise<void>
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InspectionEdit({inspection, companyId, getInspection, edit, setEdit} : InspectionEditProps) {
  const { handleSubmit } = useForm()

  const [updatedInspection, setUpdatedInspection] = useState<any>(inspection)

  const formatter = useDateFormatter({dateStyle: "medium"})

  const onSubmit = handleSubmit(async () => {
    delete updatedInspection.id
    delete updatedInspection.company_id
    const res = await fetch(`/api/inspections/update-inspection?query=${companyId}`, {
      method: "POST",
      body: JSON.stringify(updatedInspection),
      headers: { "Content-Type" : "application/json"}
    })
    if(res.ok){
      getInspection(companyId)

      if(edit) setEdit(false)
    }else{
      alert("Ha ocurrido un error, vuelve a intentarlo...")
    }
  })

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={onSubmit}
    >
      <Input 
        type="text"
        size="sm"
        className="md:w-60"
        label="Inspector"
        value={updatedInspection.inspector_name}
        onChange={e => setUpdatedInspection({...updatedInspection, inspector_name: e.target.value})}
      />

      <DateInput 
        size="sm"
        label="Fecha de la Inspección"
        className="md:w-60"
        maxValue={today(getLocalTimeZone())}
        defaultValue={inspection?.inspection_date ? parseDate(dateFormatter(inspection.inspection_date)) : null}
        onChange={e => setUpdatedInspection({...updatedInspection, inspection_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <Textarea 
        size="sm"
        label="Observaciones de la Inspección"
        value={updatedInspection.inspection_notes}
        onChange={e => setUpdatedInspection({...updatedInspection, inspection_notes: e.target.value})}
      />

      <Button 
        size="sm"
        className={`mt-5 w-full bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black`}
        type="submit"
      >
        Guardar
      </Button>
    </form>
  )
}
