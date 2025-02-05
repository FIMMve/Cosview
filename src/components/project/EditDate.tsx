import { parseDate } from "@internationalized/date";
import { DateInput } from "@nextui-org/react";
import EditIcon from "../icons/EditIcon";
import CloseIcon from "../icons/CloseIcon";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

type EditDateProps = {
  id: number
  currentProject: any
  type: string
  getProject: () => Promise<void>
}

export default function EditDate({ id, type, getProject, currentProject } : EditDateProps) {
  const [edit, setEdit] = useState(false)
  const [date, setDate] = useState(type === "start" ? parseDate(currentProject[id - 1].start) : parseDate(currentProject[id - 1].end))

  const supabase = createClient('https://eolhpjpgenlumbqjegyo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGhwanBnZW5sdW1icWplZ3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDE3MDYsImV4cCI6MjA0ODc3NzcwNn0.i8bYVMJK7zVNCGmpRfaYQ0DY8029OszB6VvK1D_hi50')

  const handleSubmit = async () => {
    const newDate = date.toDate('UTC').toISOString().substring(0, 10)
    if(type === "start"){
      const { data, error } = await supabase
        .from('Project')
        .update({ start: newDate })
        .match({ id: +id })
      console.log(data)
      if(error) window.alert("Error al actualizar la fecha...")
      getProject()
    }
    if(type === "end"){
      const { data, error } = await supabase
      .from('Project')
      .update({ end: newDate })
      .match({ id: +id })
      console.log(data)
      if(error) window.alert("Error al actualizar la fecha...")
      getProject()
    }
  }

  return (
    <DateInput 
      aria-label="project start"
      className="w-32"
      size="sm"
      variant="underlined"
      isReadOnly={!edit}
      defaultValue={date}
      onChange={setDate}
      onKeyDown={e => {
        if(edit && e.key === "Enter"){
          setEdit(false)
          handleSubmit()
        }
      }}
      endContent={
        <button 
          className='cursor-pointer print:hidden'
          onClick={() => setEdit(!edit)}
        >
          {!edit
            ? <EditIcon />
            : <CloseIcon />
          }
        </button>
      }
    />
  )
}
