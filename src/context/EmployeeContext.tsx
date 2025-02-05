"use client"

import { createContext, useEffect } from "react";
import { useState } from "react";
import type { EmployeeData, EmployeeFormValues, Log } from "@/types";

type EmployeeContextProps = {
  getEmployeeList: (id: number) => Promise<void>
  employeeList: EmployeeData[]
  log: Log
  setLog: (value: React.SetStateAction<Log>) => void
  createEmployee: (data: EmployeeFormValues, aditionalData: any) => Promise<Response>
  handleDelete: (id: number, companyId: number) => Promise<void>
  currentEmployee: EmployeeData
  setCurrentEmployee: React.Dispatch<React.SetStateAction<EmployeeData>>
  handleEdit: (data: EmployeeFormValues, companyId: number) => Promise<Response>
  mainEmployeeList: MainEmployeeList
}

type EmployeeProviderProps = {
  children: React.ReactNode
}

type MainEmployeeList = {
  manager: EmployeeData[]
  employeerRepresentative: EmployeeData[]
  preventionRepresentative: EmployeeData[]
  committee_delegate: EmployeeData[]
  committee_second_postulate: EmployeeData[]
  committee_elections: EmployeeData[]
}

export const EmployeeContext = createContext<EmployeeContextProps>(null!);

export const EmployeeProvider = ({children} : EmployeeProviderProps) => {
  const [employeeList, setEmployeeList] = useState<EmployeeData[]>([])
  const [mainEmployeeList, setMainEmployeeList] = useState<MainEmployeeList>({} as MainEmployeeList)
  const [currentEmployee, setCurrentEmployee] =useState<EmployeeData>({} as EmployeeData)
  const [log, setLog] = useState<Log>({ type: "", message: "" })

  const getEmployeeList = async (id: number) => {
    const res = await fetch(`/api/employee/get-employee?query=${id}`)
    if(res.ok){
      const data = await res.json()
      setEmployeeList(data.message)
    }
  }

  const createEmployee = async (data: EmployeeFormValues, aditionalData: any) => {
    const res = await fetch("/api/employee/add-employee", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        company_id: aditionalData.companyId,
        birthdate: aditionalData.birthdate,
        hire_date: aditionalData.hireDate,
        termination_date: aditionalData.status === "Retirado" ? aditionalData.terminationDate : null,
        status: aditionalData.status,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Empleado agregado"
      })
      getEmployeeList(aditionalData.companyId)
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }

    return res
  }

  const handleDelete = async (id: number, companyId: number) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este empleado?")
    if (!confirm) return
    const res = await fetch(`/api/employee/delete-employee`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) getEmployeeList(companyId)    
  }

  const handleEdit = async (data: EmployeeFormValues, companyId: number) => {
    const res = await fetch(`/api/employee/update-employee`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Usuario Actualizado..."
      })
      getEmployeeList(companyId)
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }

    return res
  }

  useEffect(() => {
    setMainEmployeeList({
      manager: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && (employee.position === "gerente" || employee.position === "Gerente" || employee.position === "GERENTE")),
      employeerRepresentative: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && employee.employeerRepresentative),
      preventionRepresentative: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && employee.preventionRepresentative),
      committee_delegate: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && employee.committee_delegate),
      committee_second_postulate: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && employee.committee_second_postulate),
      committee_elections: employeeList.filter((employee : EmployeeData) => employee.status === "Activo" && employee.committee_elections)
    })
  }, [employeeList])

  return(
    <EmployeeContext.Provider
      value={{
        getEmployeeList,
        employeeList,
        log,
        setLog,
        createEmployee,
        handleDelete,
        currentEmployee,
        setCurrentEmployee,
        handleEdit,
        mainEmployeeList
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}
