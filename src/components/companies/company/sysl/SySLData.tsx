"use client"

import React, { useEffect, useState } from 'react'
import CardTemplate from '../CardTemplate'
import EditSySLForm from './EditSySLForm'
import { useSysl } from '@/hooks/useSysl'
import { dateComparator } from '@/app/utils/dateFormatter'
import { useEvaluation } from '@/hooks/useEvaluation'

export default function SySLData({companyId} : {companyId: number}) {
  const { evaluation, getEvaluation } = useEvaluation()
  const { getSysl, sysl } = useSysl()

  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<any>()

  useEffect(() => {
    getSysl(companyId)
    getEvaluation(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData([
      {key: "Programa de SySL", value: sysl?.sysl_program, warning: dateComparator(sysl?.sysl_program, evaluation?.reference_date)},
      {key: "Acta de Participación y Aprobación", value: sysl?.participation_approval_minutes, warning: sysl?.participation_approval_minutes !== "cumple"},
      {key: "Programa Debidamente Firmado", value: sysl?.signed_program ? "cumple" : "no cumple", warning: !sysl?.signed_program},
      {key: "Carpeta del Servicio", value: `${(sysl?.folder?.percentage * 100).toFixed(2)} %`, warning: sysl?.folder?.percentage < 0.8},
      {key: "Accidentabilidad", value: sysl?.accident_rate, warning: dateComparator(sysl?.accident_rate, evaluation?.reference_date)},
      {key: "Morbilidad", value: sysl?.morbidity_rate, warning: dateComparator(sysl?.morbidity_rate, evaluation?.reference_date)},
      {key: "Médico Ocupacional", value: sysl?.occupational_doctor, warning: !sysl?.occupational_doctor},
    ])
  }, [sysl, evaluation])

  return (
    <CardTemplate 
      title='Seguridad y Salud Laboral'
      isEditable
      data={data ? data : []}
      edit={edit}
      setEdit={setEdit}
    >
      <EditSySLForm companyId={companyId} sysl={sysl} setEdit={setEdit} />
    </CardTemplate>
  )
}
