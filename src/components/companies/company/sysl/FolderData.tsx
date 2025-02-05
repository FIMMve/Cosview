"use client"

import { useSysl } from "@/hooks/useSysl"
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react"

type FolderDataProps = {
  companyId: number
}


export default function FolderData({ companyId }: FolderDataProps) {
  const { sysl, editSysl } = useSysl()

  const [items, setItems] = useState<any>()
  
  useEffect(() => {
    setItems([
      {label: "Registro del Comité", value: sysl?.committee_registration},
      {label: "Registro del Servicio", value: sysl?.service_registration},
      {label: "Políticas de SySL", value: sysl?.sysl_policies},
      {label: "Medicina Ocupacional", value: sysl?.occupational_medical},
      {label: "Estadísticas", value: sysl?.statistics},
      {label: "Tópicos Informativos", value: sysl?.informative_topics}
    ])
  }, [sysl])

  const handleChange = (e: number, index: number) => {
    setItems([...items, items[index].value = e])

    const data = {
      ...sysl,
      committee_registration: items[0].value,
      service_registration: items[1].value,
      sysl_policies: items[2].value,
      occupational_medical: items[3].value,
      statistics: items[4].value,
      informative_topics: items[5].value,
    }

    editSysl(companyId, data)
  }

  return (
    <Card className="mt-5">
      <CardBody className="flex flex-col flex-wrap justify-center items-center gap-5">
        <h2 className="text-lg font-bold text-primary dark:text-secondary">Cartelera Informativa</h2>

        <div className="w-full flex flex-col lg:flex-row print:flex-row flex-wrap lg:justify-between print:justify-between items-center gap-5">
          {items && items.map((item: any, index: number) => (
            <div key={item.label} className={`flex flex-col gap-2 text-center font-bold ${item.value === 0 ? "text-danger" : item.value === 1 ? "text-success" : "text-warning"}`}>
              <p className="w-full">{item.label}</p>

              {(item.value || item.value === 0) && (
                <Select
                  className="w-20 m-auto"
                  key={index}
                  size="sm"
                  defaultSelectedKeys={[`${item?.value === 1 ? "1" : item?.value === 0 ? "0" : item?.value === 0.5 && "0.5"}`]}
                  onChange={e => handleChange(+(e.target.value), index)}
                  disallowEmptySelection
                >
                  <SelectItem key={0} value={0}>0</SelectItem>
                  <SelectItem key={0.5} value={0.5}>0.5</SelectItem>
                  <SelectItem key={1} value={1}>1</SelectItem>
                </Select>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
