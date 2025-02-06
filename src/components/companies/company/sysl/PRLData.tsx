"use client"

import { useEffect, useState } from 'react'
import CardTemplate from '../CardTemplate'
import { useSysl } from '@/hooks/useSysl'
import { useEvaluation } from '@/hooks/useEvaluation'
import { dateComparator } from '@/app/utils/dateFormatter'
import EditPRLForm from './EditPRLForm'

export default function PRLData({companyId} : {companyId: number}) {
  const { evaluation } = useEvaluation()
  const { sysl } = useSysl()

  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<any>()

  useEffect(() => {
    setData([
      {key: "Programa Recreativo Laboral", value: sysl?.prl, warning: dateComparator(sysl?.prl, evaluation?.reference_date)},
      {key: "Primer Turno", value: sysl?.shifts?.first_shift},
      {key: "Segundo Turno", value: sysl?.shifts?.second_shift},
      {key: "Componente Cultural", value: sysl?.cultural_component && `${sysl?.cultural_component?.item} - ${sysl?.cultural_component?.month}`},
      {key: "Componente Deportivo", value: sysl?.sports_component && `${sysl?.sports_component?.item} - ${sysl?.sports_component?.month}`},
      {key: "Componente Recreacional", value: sysl?.recreational_component && `${sysl?.recreational_component?.item} - ${sysl?.recreational_component?.month}`},
      {key: "Componente de Formación", value: sysl?.formation_component && `${sysl?.formation_component?.item} - ${sysl?.formation_component?.month}`},
      {key: "Componente Familiar", value: sysl?.familiar_component && `${sysl?.familiar_component?.item} - ${sysl?.familiar_component?.month}`},
      {key: "Gimnasia Mental", value: sysl?.brain_gymnastics?.date && `${sysl?.brain_gymnastics?.date} - ${sysl?.brain_gymnastics?.hour}`},
      {key: "Dinámica de Integración", value: sysl?.integration_dynamics?.date && `${sysl?.integration_dynamics?.date} - ${sysl?.integration_dynamics?.hour}`},
      {key: "Pausa Activa 1", value: sysl?.active_pause?.first?.date && `Fecha: ${sysl?.active_pause?.first?.date} - Hora: ${sysl?.active_pause?.first?.hour}`},
      {key: "Pausa Activa 2", value: sysl?.active_pause?.second?.date && `Fecha: ${sysl?.active_pause?.second?.date} - Hora: ${sysl?.active_pause?.second?.hour}`},
    ])
  }, [sysl, evaluation])

  return (
    <CardTemplate 
      title='Programa Recreativo Laboral'
      isEditable
      data={data ? data : []}
      edit={edit}
      setEdit={setEdit}
    >
      <EditPRLForm companyId={companyId} sysl={sysl} setEdit={setEdit} />
    </CardTemplate>
  )
}
