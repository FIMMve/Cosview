"use client"

import { useEffect, useState } from "react"
import { useDisclosure } from "@nextui-org/react"
import CapacitationsTable from "./CapacitatiosTable"
import CreateCapacitationForm from "./CreateCapacitation"
import EditCapacitation from "./EditCapacitation"
type CapacitationsListProps = {
  companyId: number
}

export default function CapacitationsList({companyId} : CapacitationsListProps) {
  const [capacitations, setCapacitations]  = useState<any>([])
  const [currentCapacitation, setCurrentCapacitation] = useState<any>()
  const [log, setLog] = useState({ type: "", message: "" })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const getCapacitations = async (id:number) => {
    const res = await fetch(`/api/capacitations/get-capacitations?query=${id}`)
    if(res.ok){
      const data = await res.json()
      setCapacitations(data.message)
    }
  }

  useEffect(() => {
    getCapacitations(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="mb-2 mt-4 flex flex-col-reverse gap-2 md:flex-row md:justify-between md:items-end print:flex-row print:justify-between print:items-end">
        <div>
          <h2 className="text-lg font-bold text-primary dark:text-secondary">Capacitaciones</h2>
        </div>
        
        <div className="flex flex-col print:hidden">
          <CreateCapacitationForm getCapacitations={getCapacitations} log={log} setLog={setLog} companyId={companyId} />
        </div>
      </div>

      <CapacitationsTable setCurrentCapacitation={setCurrentCapacitation} companyId={companyId} onOpen={onOpen} capacitations={capacitations} setCapacitations={setCapacitations} getCapacitations={getCapacitations} />

      <EditCapacitation getCapacitations={getCapacitations} log={log} setLog={setLog} currentCapacitation={currentCapacitation} setCurrentCapacitation={setCurrentCapacitation} isOpen={isOpen} onOpenChange={onOpenChange} companyId={companyId} />
    </>
  )
}