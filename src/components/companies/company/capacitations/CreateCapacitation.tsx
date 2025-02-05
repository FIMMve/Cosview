import LogMessage from '@/components/LogMessage'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type CreateEmployeeFormProps = {
  companyId: number
  getCapacitations: (id: number) => Promise<void>
  setLog: React.Dispatch<React.SetStateAction<{
    type: string;
    message: string;
  }>>
  log: {
    type: string;
    message: string;
  }
}

export default function CreateCapacitationForm({companyId, log, setLog, getCapacitations} : CreateEmployeeFormProps) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const formatter = useDateFormatter({dateStyle: "medium"})

  const [date, setDate] = useState<any>(parseDate("2024-04-04"))

  const createCapacitation = async (data: any) => {
    const res = await fetch("/api/capacitations/add-capacitation", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Capacitacion agregada"
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

  const onSubmit = handleSubmit(async data => {
    data = {
      ...data,
      date: formatter.format(date.toDate(getLocalTimeZone())),
      company_id: +companyId,
    }

    setLog({
      type: "",
      message: ""
    })

    const res = await createCapacitation(data)

    if(res.ok){
      reset()
      onOpenChange()
    }else{
      alert("Error al agregar capacitacion")
    }
  })

  return (
    <>
      <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Agregar Capacitación</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">Agregar Capacitación</ModalHeader>
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
                  isInvalid={errors.location && true}
                  {...register("topic", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
                />

                <Input 
                  type="text"
                  label="Dinámica"
                  isInvalid={errors.location && true}
                  {...register("dynamics", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
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
    </>
  )
}
