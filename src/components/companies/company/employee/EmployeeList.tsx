"use client"

import { useEffect } from "react"
import { useEmployee } from "@/hooks/useEmployee"
import { Button, useDisclosure } from "@nextui-org/react"
import CreateEmployeeForm from "./CreateEmployeeForm"
import EmployeeTable from "./EmployeeTable"
import EditEmployeeForm from "./EditEmployeeForm"
import * as XLSX from "xlsx"
import type { EmployeeData } from "@/types/index"

type EmployeeListProps = {
  companyId: number
}

export default function EmployeeList({companyId} : EmployeeListProps) {
  const { getEmployeeList, employeeList } = useEmployee()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    getEmployeeList(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadExcel = (data: EmployeeData[]) => {
    const filteredData = data.filter(employee => employee.status !== "Retirado")
    const parsedData = filteredData.map(employee => {
      const newData = {
        Nombre: employee.name,
        Cedula: employee.id_number,
        Sexo: employee.gender,
        Nacimiento: employee.birthdate,
        Telefono: employee.phone_number,
        Contratacion: employee.hire_date,
        Cargo: employee.position,
        Delegado_Comite: employee.committee_delegate,
        Comision_Electoral: employee.committee_elections,
        Segundo_Postulado: employee.committee_second_postulate,
        Representante_Patronal: employee.employeerRepresentative,
        Delegado_Prevension: employee.preventionRepresentative,
        Formato_Ruta: employee.route_format,
        Principios_Prevencion: employee.prevention_principles,
        Rutagrama: employee.rutagrama
      }
      return newData
    })

    const ws = XLSX.utils.json_to_sheet(parsedData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Nómina")
    XLSX.writeFile(wb, "Expedientes.xlsx")
  }

  return (
    <>
      <div className="mb-2 mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-lg font-bold text-primary dark:text-secondary">Nomina</h2>
        <div className="flex flex-col md:flex-row print:hidden">

          <CreateEmployeeForm companyId={companyId} />

          <Button variant="bordered" size="sm" className="w-full mt-2 md:mt-0 md:ml-2 md:max-w-44 border-primary dark:border-secondary font-medium text-lg text-primary dark:text-secondary" onPress={() => downloadExcel(employeeList)}>Exportar Nómina</Button>
        </div>
      </div>
      <EmployeeTable companyId={companyId} isRetired={false} onOpen={onOpen}/>

      <h2 className="text-lg mb-2 mt-4 font-bold text-primary dark:text-secondary">Retirados</h2>
      <EmployeeTable companyId={companyId} isRetired={true} onOpen={onOpen}/>

      <EditEmployeeForm isOpen={isOpen} onOpenChange={onOpenChange} companyId={companyId} />
    </>
  )
}
