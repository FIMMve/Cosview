"use client"

import LeftIcon from "@/components/icons/LeftIcon"
import RightIcon from "@/components/icons/RightIcon"
import { useEmployee } from "@/hooks/useEmployee"
import { EmployeeData } from "@/types"
import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"

type MainPositionProps = {
  title: string
}

export default function MainPosition({ title } : MainPositionProps) {
  const { mainEmployeeList } = useEmployee()
  const [employee, setEmployee] = useState<EmployeeData[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if(title === "Gerente") setEmployee(mainEmployeeList.manager)
    if(title === "Delegado de Prevención") setEmployee(mainEmployeeList.preventionRepresentative)
    if(title === "Representante Patronal") setEmployee(mainEmployeeList.employeerRepresentative)
    if(title === "Delegado de Comité") setEmployee(mainEmployeeList.committee_delegate)
    if(title === "Segundo Postulado de Comité") setEmployee(mainEmployeeList.committee_second_postulate)
    if(title === "Comisión Electoral") setEmployee(mainEmployeeList.committee_elections)

    setCurrentIndex(0)
  }, [mainEmployeeList, title])


  return (
    <Card>
      <CardBody className="flex flex-col md:flex-row p-2 print:overflow-hidden">
        <div className="h-full w-full flex flex-col gap-1 md:mx-2 my-2 md:my-0">
          <h2 className="text-lg font-bold text-primary dark:text-secondary">{title}</h2>
          {mainEmployeeList && employee && employee.length > 0 
          ? (
            <>
              <p className="text-md"><span className="font-bold">Nombre Completo: </span>{employee[currentIndex].name}</p>
              <p className="text-md"><span className="font-bold">Número de Cédula: </span>{employee[currentIndex].id_number}</p>
              <p className="text-md"><span className="font-bold">Número Telefónico: </span>{employee[currentIndex].phone_number}</p>

              <div className="h-full print:hidden flex items-end justify-evenly mt-5 text-primary dark:text-secondary">
                <div className={`${currentIndex === 0 ? "cursor-not-allowed text-slate-500" : "cursor-pointer"}`} onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null}>
                  <LeftIcon />
                </div>

                <div className={`${currentIndex === employee.length - 1 ? "cursor-not-allowed text-slate-500" : "cursor-pointer"}`} onClick={() => currentIndex < employee.length - 1 ? setCurrentIndex(currentIndex + 1) : null}>
                  <RightIcon />
                </div>
              </div>
            </>            
          ):(
            <p className="text-md">Aún no ha sido agregado un {title}...</p>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
