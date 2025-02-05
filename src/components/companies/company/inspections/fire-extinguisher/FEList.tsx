"use client"

import { useEffect, useState } from "react"
import { useDisclosure } from "@nextui-org/react"
import CreateFEForm from "./CreateFEForm"
import FETable from "./FETable"
import EditFEForm from "./EditFEForm"

type FEListProps = {
  companyId: number
}

export default function FEList({companyId} : FEListProps) {
  const [fireExtinguishers, setFireExtinguishers]  = useState<any>([])
  const [currentFE, setCurrentFE] = useState<any>()
  const [statistics, setStatistics] = useState({quantity: 0, percentage: 0})
  const [log, setLog] = useState({ type: "", message: "" })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const getFireExtinguishers = async (id:number) => {
    const res = await fetch(`/api/inspections/get-fire-extinguisher?query=${id}`)
    if(res.ok){
      const data = await res.json()
      setFireExtinguishers(data.message)
    }
  }

  useEffect(() => {
    getFireExtinguishers(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(fireExtinguishers.length > 0){
      setStatistics({
        quantity: fireExtinguishers.length,
        percentage: fireExtinguishers.filter((fe: any) => fe.maintenance === true).length / fireExtinguishers.length
      })
    }
  }, [fireExtinguishers])

  return (
    <>
      <div className="mb-2 mt-4 flex flex-col-reverse gap-2 md:flex-row md:justify-between md:items-end print:flex-row print:justify-between print:items-end">
        <div>
          <h2 className="text-lg font-bold text-primary dark:text-secondary">Extintores</h2>
          <p>Cantidad: {statistics.quantity} - Extintores Operativos: {+statistics.percentage.toFixed(2) * 100}%</p>
        </div>
        
        <div className="flex flex-col print:hidden">
          <CreateFEForm getFireExtinguishers={getFireExtinguishers} log={log} setLog={setLog} companyId={companyId} />
        </div>
      </div>

      <FETable setCurrentFE={setCurrentFE} companyId={companyId} onOpen={onOpen} fireExtinguishers={fireExtinguishers} setFireExtinguishers={setFireExtinguishers} getFireExtinguishers={getFireExtinguishers} />

      <EditFEForm getFireExtinguishers={getFireExtinguishers} log={log} setLog={setLog} currentFE={currentFE} setCurrentFE={setCurrentFE} isOpen={isOpen} onOpenChange={onOpenChange} companyId={companyId} />
    </>
  )
}