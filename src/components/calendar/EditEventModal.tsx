import { parseDate } from '@internationalized/date'
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type EditEventModalProps = {
  updatedEvent: any
  setUpdatedEvent: React.Dispatch<any>
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  getEvents: () => Promise<any[] | undefined>
  colorOptions: {
    label: string;
    value: string;
    colorCode: string;
  }[]
}

export default function EditEventModal({colorOptions, isOpen, onOpenChange, onClose, getEvents, updatedEvent, setUpdatedEvent} : EditEventModalProps) {
  const { handleSubmit } = useForm()

  const [start, setStart] = useState<any>(null)
  const [end, setEnd] = useState<any>(null)
  const [send, setSend] = useState(false)

  const onSubmit = handleSubmit(async () => {
    setUpdatedEvent({
      ...updatedEvent,
      start: start.toDate().toISOString().substring(0, 10),
      end: end.toDate().toISOString().substring(0, 10)
    })
    setSend(true)
  })

    const handleEdit = async (data: any) => {
      const res = await fetch("/api/events/update-event", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if (res.ok) {
        setUpdatedEvent({} as Event)
        getEvents()
      }
      setSend(false)
      return res
    } 

  useEffect(() => {
    if(send === true){
      const request = async () => {
        const  res = await handleEdit(updatedEvent)
        if(res.ok){
          onClose()
        }else{
          alert("Error al editar evento")
        }
      }
      request()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  useEffect(() => {
    setStart(updatedEvent?.start ? parseDate(updatedEvent?.start) : null)
    setEnd(updatedEvent?.end ? parseDate(updatedEvent?.end) : null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedEvent.start, updatedEvent.end])
  return (
    <Modal isDismissable={false} size="sm" scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              Añadir Evento
            </ModalHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
                onClose()
              }}
            >
              <ModalBody>
                <>
                  <Input
                    type="text"
                    size="sm"
                    label="Nombre del Evento"
                    value={updatedEvent.title}
                    onChange={e => setUpdatedEvent({...updatedEvent, title: e.target.value})}
                  />

                  <DateInput
                    size="sm"
                    label="Inicio"
                    value={start}
                    onChange={setStart}
                  />
                  <div className="flex gap-2 items-center">
                    <Input 
                      type="number"
                      size="sm"
                      label="Hora (Inicio)"
                      value={`${updatedEvent.hour}`}
                      onChange={e => setUpdatedEvent({...updatedEvent, hour: +e.target.value})}
                    /> : 

                    <Input 
                      type="number"
                      size="sm"
                      label="Minutos (Inicio)"
                      value={`${updatedEvent.minutes}`}
                      onChange={e => setUpdatedEvent({...updatedEvent, minutes: +e.target.value})}
                    />
                  </div>

                  <DateInput 
                    size="sm"
                    label="Fin"
                    value={end}
                    onChange={setEnd}
                    minValue={start}
                  />
                  <div className="flex gap-2 items-center">
                    <Input 
                      type="number"
                      size="sm"
                      label="Hora (Fin)"
                      value={`${updatedEvent.end_hour}`}
                      onChange={e => setUpdatedEvent({...updatedEvent, end_hour: +e.target.value})}
                    /> : 

                    <Input 
                      type="number"
                      size="sm"
                      label="Minutos (Fin)"
                      value={`${updatedEvent.end_minutes}`}
                      onChange={e => setUpdatedEvent({...updatedEvent, end_minutes: +e.target.value})}
                    />
                  </div>

                  <Textarea 
                    size="sm"
                    label="Notas"
                    value={updatedEvent.notes}
                    onChange={e => setUpdatedEvent({...updatedEvent, notes: e.target.value})}
                  />

                  <Select
                    size="sm"
                    label="Seleccionar Color"
                    disallowEmptySelection
                    defaultSelectedKeys={[updatedEvent.color]}
                    onChange={e => {
                      setUpdatedEvent({...updatedEvent, color: e.target.value})
                    }}
                  >
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value} onClick={() => setUpdatedEvent({...updatedEvent, backgroundColor: color.colorCode, color: color.value})} >{color.label}</SelectItem>
                    ))}
                  </Select>
                </>

              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm" 
                  type="submit"
                  disabled={updatedEvent.title === "" || updatedEvent.title === null || updatedEvent.title === undefined || !updatedEvent.title || !updatedEvent.hour || !updatedEvent.minutes}
                  className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black disabled:bg-slate-400"
                  isDisabled={updatedEvent.title === ""}
                >
                  Añadir Evento
                </Button>
                <Button size="sm" variant="bordered" className="w-full md:max-w-44 text-danger border-danger font-medium text-lg" onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
