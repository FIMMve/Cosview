"use client"

import { dateFormatter } from "@/app/utils/dateFormatter"
import LogMessage from "@/components/LogMessage"
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useDateFormatter } from "@react-aria/i18n"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type EditCapacitationProps = {
  isOpen: boolean
  onOpenChange: () => void
  companyId: number
  currentCapacitation: any
  setCurrentCapacitation: React.Dispatch<any>
  setLog: React.Dispatch<React.SetStateAction<{
    type: string;
    message: string;
  }>>
  log: {
    type: string;
    message: string;
  }
  getCapacitations: (id: number) => Promise<void>
}

export default function EditCapacitation({isOpen, onOpenChange, companyId, currentCapacitation, setCurrentCapacitation, log, setLog, getCapacitations} : EditCapacitationProps) {
  const { handleSubmit, reset } = useForm()
  const formatter = useDateFormatter({dateStyle: "medium"})

  const [date, setDate] = useState<any>(parseDate("2024-04-04"))
  const [send, setSend] = useState<boolean>(false)

  const onSubmit = handleSubmit(async () => {
    setCurrentCapacitation({
      ...currentCapacitation,
      date: formatter.format(date.toDate(getLocalTimeZone())),
    })
    setSend(true)
  })

  const handleEdit = async (data: any, companyId: number) => {
    const res = await fetch(`/api/capacitations/update-capacitation`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Capacitacion Actualizada..."
      })
      getCapacitations(companyId)
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }

    return res
  }

  useEffect(() => {
    if(send === true) {
      const request = async () => {
        setLog({
          type: "",
          message: ""
        })
        const res = await handleEdit(currentCapacitation, companyId)
        if(res.ok){
          reset()
          return
        }     
        setLog({
          type: "error",
          message: "Error al editar capacitacion"
        }) 
      }
      request()
    }
    setSend(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  useEffect(() => {
    if(currentCapacitation?.date) setDate(parseDate(dateFormatter(currentCapacitation?.date)))
      console.log(currentCapacitation)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCapacitation])

  return (
    <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
      {(onClose) => (
        <>
          <form onSubmit={onSubmit} >
            <ModalHeader className="flex flex-col gap-1">Agregar Extintor</ModalHeader>
            <ModalBody className="flex flex-col gap-5">

            <DateInput 
              size="sm"
              label="Fecha"
              value={date}
              onChange={setDate}
            />

            <Input 
              type="text"
              label="Tema"
              value={currentCapacitation?.topic}
              onChange={e => setCurrentCapacitation({...currentCapacitation, topic: e.target.value})}
            />

            <Input 
              type="text"
              label="Dinámica"
              value={currentCapacitation?.dynamics}
              onChange={e => setCurrentCapacitation({...currentCapacitation, dynamics: e.target.value})}
            />

            {log.type && <LogMessage log={log} />}

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => {
                onClose()
                setLog({ type: "", message: "" })
              }}>
                Cancelar
              </Button>
              <Button
                size="sm"
                className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
                type="submit"
              >
                Guardar
              </Button>
            </ModalFooter>
          </form>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}
