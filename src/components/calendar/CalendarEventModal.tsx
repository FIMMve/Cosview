"use client"

import { Event } from "./Calendar";
import { parseDate } from "@internationalized/date"
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type CalendarEventModalProps = {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  newEvent: Event
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>
  colorOptions: {
    label: string;
    value: string;
    colorCode: string;
  }[]
  getEvents: () => Promise<any[] | undefined>
}

export default function CalendarEventModal({ isOpen, onOpenChange, onClose, newEvent, setNewEvent, colorOptions, getEvents } : CalendarEventModalProps) {
  const { handleSubmit } = useForm()

  const [start, setStart] = useState<any>(null)
  const [end, setEnd] = useState<any>(null)

  const [send, setSend] = useState(false)

  const handleCreate = async (data: any) => {
    const res = await fetch("/api/events/add-event", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setNewEvent({} as Event)
      getEvents()
    }
    setSend(false)
    return res
  }

  const onSubmit = handleSubmit(async () => {
    setNewEvent({
      ...newEvent,
      start: start.toDate().toISOString().substring(0, 10),
      end: end.toDate().toISOString().substring(0, 10)
    })
    setSend(true)
  })
  
  useEffect(() => {
    if(send === true){
      const request = async () => {
        const  res = await handleCreate(newEvent)
        if(res.ok){
          onClose()
        }else{
          alert("Error al agregar evento")
        }
      }
      request()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  useEffect(() => {
    setStart(newEvent?.start ? parseDate(newEvent?.start) : null)
    setEnd(newEvent?.end ? parseDate(newEvent?.end) : null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEvent.start, newEvent.end])

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
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
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
                      value={`${newEvent.hour}`}
                      onChange={e => setNewEvent({...newEvent, hour: +e.target.value})}
                    /> : 

                    <Input 
                      type="number"
                      size="sm"
                      label="Minutos (Inicio)"
                      value={`${newEvent.minutes}`}
                      onChange={e => setNewEvent({...newEvent, minutes: +e.target.value})}
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
                      value={`${newEvent.end_hour}`}
                      onChange={e => setNewEvent({...newEvent, end_hour: +e.target.value})}
                    /> : 

                    <Input 
                      type="number"
                      size="sm"
                      label="Minutos (Fin)"
                      value={`${newEvent.end_minutes}`}
                      onChange={e => setNewEvent({...newEvent, end_minutes: +e.target.value})}
                    />
                  </div>

                  <Textarea 
                    size="sm"
                    label="Notas"
                    value={newEvent.notes}
                    onChange={e => setNewEvent({...newEvent, notes: e.target.value})}
                  />

                  <Select
                    size="sm"
                    label="Seleccionar Color"
                    defaultSelectedKeys={[newEvent.color]}
                    disallowEmptySelection
                    onChange={e => {
                      setNewEvent({...newEvent, color: e.target.value})
                    }}
                  >
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value} onClick={() => setNewEvent({...newEvent, backgroundColor: color.colorCode, color: color.value})} >{color.label}</SelectItem>
                    ))}
                  </Select>
                </>

              </ModalBody>
              <ModalFooter>
                <Button 
                  size="sm" 
                  type="submit"
                  disabled={newEvent.title === "" || newEvent.title === null || newEvent.title === undefined || !newEvent.title || !newEvent.hour || !newEvent.minutes}
                  className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black disabled:bg-slate-400"
                  isDisabled={newEvent.title === ""}
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
