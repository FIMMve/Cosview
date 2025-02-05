import { Event } from "./Calendar";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import EditEventModal from "./EditEventModal";
import { useState } from "react";

type EventsProps = { 
  event: Event
  handleDelete: (id: number) => Promise<void>
  colorOptions: {
    label: string;
    value: string;
    colorCode: string;
  }[]
  getEvents: () => Promise<any[] | undefined>
}

export default function Events({ event, handleDelete, getEvents, colorOptions } : EventsProps) {
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure()

  const [updatedEvent, setUpdatedEvent] = useState<any>(event)

  return (
    <>
      <Card className={`w-full ${event.color}`}>
        <CardBody className="relative">
          <h3 className="font-bold text-xl mb-2 text-slate-200">{event.title}</h3>
          <div className="flex gap-2">
            <p className="text-md text-slate-200">Inicio: {event.start}</p>
            <div className="flex flex-gap">
              <p className="text-md text-slate-200">Hora: {event.hour}:</p>
              <p className="text-md text-slate-200">{event.minutes}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="text-md text-slate-200">Fin: {event.end}</p>
            <div className="flex flex-gap">
              <p className="text-md text-slate-200">Hora: {event.end_hour}:</p>
              <p className="text-md text-slate-200">{event.end_minutes}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-between text-wrap">
            <p className="w-3/4 text-slate-200">{event.notes}</p>
            <div className="cursor-pointer absolute top-2 right-10 bg-white dark:bg-black opacity-70 p-1 rounded-lg" onClick={() => {
              onOpen()
              setUpdatedEvent(event)
            }}>
              <EditIcon />
            </div>
            <div className="cursor-pointer absolute top-2 right-2 bg-white dark:bg-black opacity-70 p-1 rounded-lg" onClick={() => handleDelete(event.id)}>
              <CloseIcon />
            </div>
          </div>
        </CardBody>
      </Card>


      <EditEventModal updatedEvent={updatedEvent} setUpdatedEvent={setUpdatedEvent} getEvents={getEvents} colorOptions={colorOptions} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  )
}
