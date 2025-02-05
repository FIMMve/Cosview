"use client"

import Calendar from "@/components/calendar/Calendar"
// import Project from "@/components/project/Project"
// import { Button } from "@nextui-org/react"
// import { createClient } from "@supabase/supabase-js"
// import { useEffect, useState } from "react"

export default function Dashboard() {
  // const supabase = createClient('https://eolhpjpgenlumbqjegyo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGhwanBnZW5sdW1icWplZ3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDE3MDYsImV4cCI6MjA0ODc3NzcwNn0.i8bYVMJK7zVNCGmpRfaYQ0DY8029OszB6VvK1D_hi50')

  // const [currentProject, setCurrentProject] = useState<any>([])

  // const getProject = async () => {
  //   const { data: Project } = await supabase
  //   .from('Project')
  //   .select('*')
  //   .order("id", {ascending: true})

  //   setCurrentProject(Project)
  // }

  // const handleCreate = async () => {
  //   const res = await fetch("/api/project/initialize-project", {
  //     method: "POST"
  //   })
  //   if(res.ok){
  //     getProject()
  //     return
  //   } 
  //   window.alert("Error al inicializar el proyecto")
  // }

  // useEffect(() => {
  //   getProject()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  
  return (
    <main className="w-full flex flex-col gap-5">
{/*       <section className="lg:w-3/4 lg:mx-auto flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-2 md:justify-between justify-center md:items-end md:mb-5">
          <h2 className="text-2xl print:mt-0 mt-20 font-bold text-primary dark:text-secondary">Proyecto</h2>
          {currentProject.length < 19 && (
            <Button size="sm" onClick={e => {
              e.preventDefault()
              handleCreate()
            }} className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black flex">Inicializar Proyecto</Button>
          )}
        </div>
        <Project getProject={getProject} currentProject={currentProject} setCurrentProject={setCurrentProject}/>
      </section> */}

      <section className="lg:w-3/4 lg:mx-auto flex flex-col gap-5">
        <h2 className="text-2xl print:mt-0 mt-20 mb-5 font-bold text-primary dark:text-secondary">Eventos</h2>
        <Calendar/>
      </section>
    </main>
  )
}
