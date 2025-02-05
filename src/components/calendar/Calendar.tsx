"use client"

import { useEffect, useState } from "react"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from "@fullcalendar/core/locales/es"
import { Card, CardBody, useDisclosure } from "@nextui-org/react"
import { EventSourceInput } from "@fullcalendar/core/index.js"
import CalendarEventModal from "@/components/calendar/CalendarEventModal"
import Events from "@/components/calendar/Events"
import { createClient } from "@supabase/supabase-js"

export type Event = {
  id: number
  title: string
  start: string
  end: string
  allDay: boolean
  color: string
  backgroundColor: string
  notes?: string
  hour: number
  minutes: number
  end_hour: number
  end_minutes: number

  createdAt?: any
  updatedAt?: any
}

const colorOptions = [
  { label: 'Azul', value: 'bg-blue-500', colorCode: '#006FEE' }, 
  { label: 'Rojo', value: 'bg-danger', colorCode: '#f31260' },
  { label: 'Verde', value: 'bg-success', colorCode: '#17c964' },
  { label: 'Amarillo', value: 'bg-warning', colorCode: '#f5a524' },
  { label: 'Morado', value: 'bg-purple-400', colorCode: '#9353d3' },
  { label: 'Negro', value: 'bg-default', colorCode: '#3f3f46' }
]

export default function Calendar() {
  const supabase = createClient('https://eolhpjpgenlumbqjegyo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGhwanBnZW5sdW1icWplZ3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDE3MDYsImV4cCI6MjA0ODc3NzcwNn0.i8bYVMJK7zVNCGmpRfaYQ0DY8029OszB6VvK1D_hi50')

  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure()

  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({} as Event)
        

  function sortByDate(events:any) {
    const list = events
    const dateComparator = (a:any, b:any) => {
      const date1 = new Date(a.start);
      const date2 = new Date(b.start);
      return date1.getTime() - date2.getTime();
    };
    return list.slice().sort(dateComparator);
  }

  const getEvents = async () => {
    const { data: Events } = await supabase
      .from('Events')
      .select('*')

    // const res = await fetch("/api/events/get-all-events")
    if(Events){
      const sortedData = sortByDate(Events);
      setAllEvents(sortedData)
      return Events
    }
  }

  useEffect(() => {
    getEvents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDateClick = (e: {date: Date, allDay: boolean}) => {
    setNewEvent({
      ...newEvent,
      start: e.date.toISOString().substring(0, 10),
      end: e.date.toISOString().substring(0, 10),
      hour: 10,
      minutes: 30,
      end_hour: 11,
      end_minutes: 30,
      color: "bg-blue-500",
      backgroundColor: "#006FEE"
    })
    setTimeout(() => onOpen(), 500)
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este evento?")
    if (!confirm) return
    const res = await fetch("/api/events/delete-event", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) getEvents()
  }

  return (
    <article className="w-full flex flex-col lg:flex-row items-start gap-5">
      <Card className="w-full">
        <CardBody className="text-primary dark:text-secondary font-bold">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today'
            }}
            events={allEvents as EventSourceInput}
            locale={esLocale}
            nowIndicator
            selectable
            selectMirror
            dateClick={handleDateClick}
          />
        </CardBody>
      </Card>

      <CalendarEventModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}  newEvent={newEvent} setNewEvent={setNewEvent} colorOptions={colorOptions} getEvents={getEvents} />

      <div className="w-full flex flex-col gap-5">
        {allEvents.length > 0 && allEvents.map(event => (
          <Events key={event.id} event={event} handleDelete={handleDelete} getEvents={getEvents} colorOptions={colorOptions} />
        ))}
      </div>
    </article>
  )
}