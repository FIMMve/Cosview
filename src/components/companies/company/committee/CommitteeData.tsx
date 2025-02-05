"use client"

import { useEffect, useState } from "react";
import CardTemplate from "../CardTemplate";
import EditCommitteeForm from "./EditCommitteeForm";
import type { CommitteeData } from "@/types";
import { dateComparator } from "@/app/utils/dateFormatter";
import { useEvaluation } from "@/hooks/useEvaluation";

type CommitteeDataProps = {
  companyId: number
}

export default function CommitteeData({companyId} : CommitteeDataProps) {
  const { getEvaluation } = useEvaluation()

  const [edit, setEdit] = useState(false)
  type CommitteeItem = {
    key: string;
    value: string;
    warning?: boolean | null
  };

  const [committeeData, setCommitteeData] = useState<CommitteeItem[]>([])
  const [currentCommittee, setCurrentCommittee] = useState<CommitteeData>({} as CommitteeData)
  
  const getCommittee = async (id: number) => {
    const res = await fetch(`/api/committee/get-committee?query=${id}`,{
      method: "GET",
      headers: {"Content-Type" : "application/json"}	
    })
    const data = await res.json()
    const committee = data.message

    const date = await getEvaluation(companyId)

    setCurrentCommittee(committee)
    setCommitteeData([
      {key: "Constitución del Comité", value: committee?.constitution},
      {key: "Registro del Delegado", value: committee?.delegate_code},
      {key: "Fecha del Registro", value: committee?.registratrion_date},
      {key: "Informe de INPSASEL", value: committee?.inpsasel_report_date, warning: dateComparator(committee?.inpsasel_report_date, date?.reference_date)},
      {key: "Transcripción en el Libro de Actas", value: committee.transcription_date, warning: dateComparator(committee?.transcription_date, date?.reference_date)},
      {key: "Carta al Ministerio de Trabajo", value: committee.ministry_labor_letter},
      {key: "Pag.18, 19 y 20, +5 Despues de Carta a MinTra", value: committee.call_date},
      {key: "Pag.22, +2 Despues de Pag.18", value: committee.application_date},
      {key: "Pag.23, 26, 27 y 29, +10 Despues de Pag.22", value: committee.election_date},
      {key: "Mutuo Acuerdo, +10 Despues de Carta a MinTra", value: committee.mutual_agreement},
      {key: "Designación, +1 Despues de Pag.23", value: committee.designation_date},
      {key: "Aceptación, +1 Despues de Designación", value: committee.aceptance_date},
      {key: "Acuerdo Formal, +1 Despues de Aceptación", value: committee.formal_agreement},
    ])
  }

  useEffect(() => {
    getCommittee(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CardTemplate
      data={committeeData}
      title="Datos del Comité"
      edit={edit}
      setEdit={setEdit}
      isEditable={true}
    >
      <EditCommitteeForm setEdit={setEdit} companyId={companyId} getCommittee={getCommittee} currentCommittee={currentCommittee} />
    </CardTemplate>
  )
}
