"use client"

import CloseIcon from "@/components/icons/CloseIcon";
import EditIcon from "@/components/icons/EditIcon";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import EditFirstAids from "./EditFirstAids";

type FirstAidsDataProps = {
  companyId: number
}

export default function FirstAidsData({companyId} : FirstAidsDataProps) {
  
  const [firstAids, setFirstAids] = useState<any>()
  const [updatedFirstAids, setUpdatedFirstAids] = useState<any>()
  const [data, setData] = useState<{ key: string; value: any; warning: boolean; punctuation: number | undefined }[] | undefined>(undefined)
  const [edit, setEdit] = useState(false)

  const getFirstAids = async (id: number) => {
    const res = await fetch(`/api/inspections/get-first-aids?query=${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application-json"
      }
    })

    if(res.ok){
      const data = await res.json()
      setFirstAids(data.message)
    }
  }

  const calculatePercentage = (value: any, reference: number): number => {
    if(value === 0) return 0
    if(value < reference) return 0
    if(value >= reference) return 1

    return 0
  }

  useEffect(() => {
    getFirstAids(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(firstAids) setData([
      { key: "Algodón", value: firstAids?.cotton, warning: firstAids?.cotton < 1, punctuation: calculatePercentage(firstAids?.cotton, 1)},
      { key: "Rollo de gasa", value: firstAids?.gauze_roll, warning: firstAids?.gauze_roll < 2, punctuation: calculatePercentage(firstAids?.gauze_roll, 2)},
      { key: "Gasa estéril", value: firstAids?.sterile_gauze, warning: firstAids?.sterile_gauze < 20, punctuation: calculatePercentage(firstAids?.sterile_gauze,20)},
      { key: "Curaciones para ojos", value: firstAids?.eye_cures, warning: firstAids?.eye_cures < 2, punctuation: calculatePercentage(firstAids?.eye_cures, 2)},
      { key: "Adhesivo", value: firstAids?.adhesive, warning: firstAids?.adhesive < 1, punctuation: calculatePercentage(firstAids?.adhesive, 1)},
      { key: "Curitas", value: firstAids?.bandaids, warning: firstAids?.bandaids < 50, punctuation: calculatePercentage(firstAids?.bandaids,50)},
      { key: "Venda elástica 6cm", value: firstAids?.elastic_bandage_6, warning: firstAids?.elastic_bandage_6 < 2, punctuation: calculatePercentage(firstAids?.elastic_bandage_6, 2)},
      { key: "Venda elástica 8cm", value: firstAids?.elastic_bandage_8, warning: firstAids?.elastic_bandage_8 < 2, punctuation: calculatePercentage(firstAids?.elastic_bandage_8, 2)},
      { key: "Venda elástica 12cm", value: firstAids?.elastic_bandage_12, warning: firstAids?.elastic_bandage_12 < 2, punctuation: calculatePercentage(firstAids?.elastic_bandage_12, 2)},
      { key: "Apósito estéril", value: firstAids?.sterile_dressing, warning: firstAids?.sterile_dressing < 4, punctuation: calculatePercentage(firstAids?.sterile_dressing, 4)},
      { key: "Espátula lingual", value: firstAids?.tongue_depressor, warning: firstAids?.tongue_depressor < 10, punctuation: calculatePercentage(firstAids?.tongue_depressor,10)},
      { key: "Aplicador de algodón", value: firstAids?.cotton_applicator, warning: firstAids?.cotton_applicator < 50, punctuation: calculatePercentage(firstAids?.cotton_applicato,50)},
      { key: "Venda triangular", value: firstAids?.triangular_bandages, warning: firstAids?.triangular_bandages < 4, punctuation: calculatePercentage(firstAids?.triangular_bandages, 4)},
      { key: "Tijeras", value: firstAids?.scissors, warning: firstAids?.scissors < 1, punctuation: calculatePercentage(firstAids?.scissors, 1)},
      { key: "Jabón", value: firstAids?.soap, warning: firstAids?.soap < 1, punctuation: calculatePercentage(firstAids?.soap, 1)},
      { key: "Termómetro oral", value: firstAids?.oral_thermometer, warning: firstAids?.oral_thermometer < 1, punctuation: calculatePercentage(firstAids?.oral_thermometer, 1)},
      { key: "Lavado ocular", value: firstAids?.eye_wash, warning: firstAids?.eye_wash < 1, punctuation: calculatePercentage(firstAids?.eye_wash, 1)},
      { key: "Antiinflamatorio", value: firstAids?.anti_inflammatory, warning: firstAids?.anti_inflammatory < 1, punctuation: calculatePercentage(firstAids?.anti_inflammatory, 1)},
      { key: "Alcohol", value: firstAids?.alcohol, warning: firstAids?.alcohol < 1, punctuation: calculatePercentage(firstAids?.alcohol, 1)},
      { key: "Agua Oxigenada", value: firstAids?.hydrogen_peroxide, warning: firstAids?.hydrogen_peroxide < 1, punctuation: calculatePercentage(firstAids?.hydrogen_peroxide, 1)},
      { key: "Guantes desechables", value: firstAids?.disposable_gloves, warning: firstAids?.disposable_gloves < 1, punctuation: calculatePercentage(firstAids?.disposable_gloves, 1)},
    ])

    setUpdatedFirstAids({
      ...firstAids,
      firstAids: 0
    })
  }, [firstAids])

  useEffect(() => {
    if(!data) return 
    if(data?.length === 0) return

      let acc = 0
      data.map(element => {
        if(element.punctuation) acc += element.punctuation
        return
      })
      setUpdatedFirstAids({
        ...updatedFirstAids,
        firstAids: acc / 20
      })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Card>
      <CardBody className="flex flex-col md:flex-row p-2 md:relative pb-5">

        <div className="w-full flex flex-col gap-1 md:mx-2 my-2 md:my-0">
          <h2 className="text-lg font-bold text-primary dark:text-secondary">Botiquín</h2>

          {data && updatedFirstAids && edit ? (
            <EditFirstAids edit={edit} setEdit={setEdit} getFirstAids={getFirstAids} companyId={companyId} updatedFirstAids={updatedFirstAids} setUpdatedFirstAids={setUpdatedFirstAids} />
          ) : (
            <div className="flex flex-col md:flex-row print:flex-row gap-5">
              <div className="w-52">
                <p className="text-md w-full"><span className={`font-bold ${!firstAids?.location && "text-danger"}`}>Ubicación: </span>{firstAids?.location}</p>
                <p className="text-md mb-2 w-full"><span className={`font-bold ${!updatedFirstAids?.firstAids && "text-danger"} ${+updatedFirstAids?.firstAids.toFixed(2) <= 0.55 && "text-warning"}`}>Cumplimiento: </span>{+updatedFirstAids?.firstAids.toFixed(2) * 100}%</p>
              </div>
              
              <div className="w-full max-w-[1100px]  flex flex-col md:flex-row print:flex-row md:justify-between md:flex-wrap gap-2">
                <div className="flex flex-col gap-2 w-full md:w-64">
                  {data?.map((item: any, index: number) => (
                    (index < 7) && (
                      <div key={item.key} className={`flex justify-between text-md ${item.value > 0 && item.warning && "text-warning"}`}>
                        <p className={`font-bold ${item.value < 1 && "text-danger"}`}>{item.key && `${item.key}:`}</p>
                        <p>{item.value}</p>
                      </div>
                    )
                  ))}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-64">
                  {data?.map((item: any, index: number) => (
                    (index > 6 && index < 14) && (
                      <div key={item.key} className={`flex justify-between text-md ${item.value > 0 && item.warning && "text-warning"}`}>
                        <p className={`font-bold ${item.value < 1 && "text-danger"}`}>{item.key && `${item.key}:`}</p>
                        <p>{item.value}</p>
                      </div>
                    )
                  ))}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-64">
                  {data?.map((item: any, index: number) => (
                    (index > 14) && (
                      <div key={item.key} className={`w-full flex justify-between text-md ${item.value > 0 && item.warning && "text-warning"}`}>
                        <p className={`font-bold ${item.value < 1 && "text-danger"}`}>{item.key && `${item.key}:`}</p>
                        <p>{item.value}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end items-start md:absolute md:top-2 md:right-2">
            {!edit && <button onClick={() => setEdit(true)}><EditIcon /></button>}
            {edit && <button onClick={() => setEdit(false)}><CloseIcon /></button>}  
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
