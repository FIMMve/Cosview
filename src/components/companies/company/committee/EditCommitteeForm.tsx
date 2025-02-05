"use client"

import { useForm } from "react-hook-form"
import type { CommitteeData } from "@/types"
import { Button, DateInput, Input } from "@nextui-org/react"
import { useState } from "react"
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { dateFormatter } from "@/app/utils/dateFormatter"
import { useDateFormatter } from "@react-aria/i18n"
import { useEvaluation } from "@/hooks/useEvaluation"

type EditCommitteeFormProps = {
  companyId: number
  getCommittee: (id: number) => Promise<void>
  currentCommittee: CommitteeData
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditCommitteeForm({setEdit, companyId, getCommittee, currentCommittee} : EditCommitteeFormProps) {
  const { getEvaluation } = useEvaluation()
  const { handleSubmit } = useForm()

  const [committeeData, setCommitteeData] = useState<CommitteeData>(currentCommittee)

  const formatter = useDateFormatter({dateStyle: "medium"})

  const onSubmit = handleSubmit( async () => {
    const res = await fetch(`/api/committee/update-committee?query=${companyId}`, {
      method: "PUT",
      body: JSON.stringify(committeeData),
      headers: {"Content-Type" : "application/json"}
    })
    if(res.ok){
      getEvaluation(companyId)
      getCommittee(companyId)
      setEdit(false)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2"
    >
      <Input
        type="text" 
        size="sm"
        label="Constitución del Comité"
        defaultValue={currentCommittee?.constitution}
        onChange={e => setCommitteeData({...committeeData, constitution: e.target.value})}
      />

      <Input
        type="text" 
        size="sm"
        label="Registro del Delegado"
        defaultValue={currentCommittee?.delegate_code}
        onChange={e => setCommitteeData({...committeeData, delegate_code: e.target.value})}
      />

      <DateInput 
        size="sm"
        label="Fecha del Registro"
        defaultValue={currentCommittee?.registratrion_date ? parseDate(dateFormatter(currentCommittee.registratrion_date)) : null}
        onChange={e => setCommitteeData({...committeeData, registratrion_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Informe de INPSASEL"
        defaultValue={currentCommittee?.inpsasel_report_date ? parseDate(dateFormatter(currentCommittee.inpsasel_report_date)) : null}
        onChange={e => setCommitteeData({...committeeData, inpsasel_report_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Transcripción en el Libro de Actas"
        defaultValue={currentCommittee?.transcription_date ? parseDate(dateFormatter(currentCommittee.transcription_date)) : null}
        onChange={e => setCommitteeData({...committeeData, transcription_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />
        
      <DateInput 
        size="sm"
        label="Carta al Ministerio de Trabajo"
        defaultValue={currentCommittee?.ministry_labor_letter ? parseDate(dateFormatter(currentCommittee.ministry_labor_letter)) : null}
        onChange={e => setCommitteeData({...committeeData, ministry_labor_letter: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Pag. 18, 19 y 20, +5 Despues de Carta a MinTra"
        defaultValue={currentCommittee?.call_date ? parseDate(dateFormatter(currentCommittee.call_date)) : null}
        onChange={e => setCommitteeData({...committeeData, call_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Pag. 22, +2 Despues de Pag.18"
        defaultValue={currentCommittee?.application_date ? parseDate(dateFormatter(currentCommittee.application_date)) : null}
        onChange={e => setCommitteeData({...committeeData, application_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Pag. 23, 26, 27 y 29, +10 Despues de Pag.22"
        defaultValue={currentCommittee?.election_date ? parseDate(dateFormatter(currentCommittee.election_date)) : null}
        onChange={e => setCommitteeData({...committeeData, election_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Mutuo Acuerdo, +10 Despues de Carta a MinTra"
        defaultValue={currentCommittee?.mutual_agreement ? parseDate(dateFormatter(currentCommittee.mutual_agreement)) : null}
        onChange={e => setCommitteeData({...committeeData, mutual_agreement: formatter.format(e.toDate(getLocalTimeZone()))})}
      />      

      <DateInput 
        size="sm"
        label="Designación, +1 Despues de Pag.23"
        defaultValue={currentCommittee?.designation_date ? parseDate(dateFormatter(currentCommittee.designation_date)) : null}
        onChange={e => setCommitteeData({...committeeData, designation_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Aceptación, +1 Despues de Designación"
        defaultValue={currentCommittee?.aceptance_date ? parseDate(dateFormatter(currentCommittee.aceptance_date)) : null}
        onChange={e => setCommitteeData({...committeeData, aceptance_date: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Acuerdo Formal, +1 Despues de Aceptación"
        defaultValue={currentCommittee?.formal_agreement ? parseDate(dateFormatter(currentCommittee.formal_agreement)) : null}
        onChange={e => setCommitteeData({...committeeData, formal_agreement: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

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
