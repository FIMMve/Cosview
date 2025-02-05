"use client"

import { Card, CardBody, Progress } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import EditDate from "./EditDate";

const initialProject = [
  {
    title: "Gestión del Comité de Seguridad y Salud en el Laboral",
    progress: 0,
    start: "2021-09-01",
    end: "2022-09-01",
    items: [
      {id: 1, title: "Registros", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 2, title: "Solicitud de Elecciones", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 3, title: "Delegados de Prevención", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 4, title: "Representantes Patronales", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 5, title: "Informes del Mes Pasado", progress: 0, start: "2021-09-01", end: "2022-09-01"},
    ]
  },
  {
    title: "Gestión de las Carpetas de Seguridad y Salud Laboral",
    progress: 0,
    start: "2021-09-01",
    end: "2022-09-01",
    items: [
      {id: 6, title: "Programa de SySL", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 7, title: "PRL", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 8, title: "Pausas activas", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 9, title: "Carpeta del servicio", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 10, title: "Accidentabilidad", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 11, title: "Morbilidad", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 12, title: "Cartelera", progress: 0, start: "2021-09-01", end: "2022-09-01"},
    ]
  },
  {
    title: "Gestión de las Inspecciones de las Áreas de Trabajo",
    progress: 0,
    start: "2021-09-01",
    end: "2022-09-01",
    items: [
      {id: 13, title: "Extintores", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 14, title: "Botiquín de Primeros Auxilios", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 15, title: "Lamparas de Emergencia", progress: 0, start: "2021-09-01", end: "2022-09-01"},
    ]
  },
  {
    title: "Gestión de los Expedientes de los Trabajadores",
    progress: 0,
    start: "2021-09-01",
    end: "2022-09-01",
    items: [
      {id: 16, title: "Principios de prevención", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 17, title: "Formato de recorrido", progress: 0, start: "2021-09-01", end: "2022-09-01"},
      {id: 18, title: "Rutagrama", progress: 0, start: "2021-09-01", end: "2022-09-01"},
    ]
  },
  {
    title: "Gestión de las Visitar Realizadas a la Zonas",
    progress: 0,
    start: "2021-09-01",
    end: "2022-09-01",
    items: [
      {id: 19, title: "Visitas Zona Mérida", progress: 0, start: "2021-09-01", end: "2022-09-01"},
    ]
  },
]

type ProjectProps = {
  currentProject: any
  setCurrentProject: React.Dispatch<any>
  getProject: () => Promise<void>
}

export default function Project({currentProject, getProject}:ProjectProps) {
  const [project, setProject] = useState([...initialProject])
  const [evaluations, setEvaluations] = useState<any>()
  const [committee, setCommittee] = useState<any>()
  const [employee, setEmployee] = useState<any>()
  const [sysl, setSysl] = useState<any>()
  const [inspection, setInspection] = useState<any>()

  const supabase = createClient('https://eolhpjpgenlumbqjegyo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGhwanBnZW5sdW1icWplZ3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDE3MDYsImV4cCI6MjA0ODc3NzcwNn0.i8bYVMJK7zVNCGmpRfaYQ0DY8029OszB6VvK1D_hi50')

  const getData = async () =>{
    const { data: Evaluations } = await supabase
    .from('Evaluations')
    .select('*')

    const { data: Committee } = await supabase
    .from('Committee')
    .select('*')

    const { data: Employee } = await supabase
    .from('EmployeeRecord')
    .select('*')

    const { data: Sysl } = await supabase
    .from('Sysl')
    .select('*')

    const { data: Inspection } = await supabase
    .from('Inspection')
    .select('*')
        
    setEvaluations(Evaluations)
    setCommittee(Committee)
    setEmployee(Employee)
    setSysl(Sysl)
    setInspection(Inspection)
  }

  useEffect(() => {
    setEvaluations(null)
    setCommittee(null)
    setEmployee(null)
    setSysl(null)
    setInspection(null)
    setProject([...initialProject])
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentProject])
        
  useEffect(() => {
    if(evaluations){
      const numberOfCompanies = evaluations.length

      evaluations.map((item:any) => {
        project[0].items[0].progress += item?.committee?.center_certificate > 0 ? 1 : 0
        project[0].items[0].progress += item?.committee?.committee_certificate > 0 ? 1 : 0
        project[0].items[0].progress += item?.committee?.delegate_certificate > 0 ? 1 : 0

        if(item?.sysl !== null){
          if(item?.sysl?.folder === 3) project[1].items[3].progress += 1
          if(item?.sysl?.accident_rate === 3) project[1].items[4].progress += 1
          if(item?.sysl?.morbidity_rate === 3) project[1].items[5].progress += 1
          if(item?.sysl?.billboard === 3) project[1].items[6].progress += 1
        }

        if(item?.inspection !== null){
          if(item?.inspection?.fire_extinguisher === 3) project[2].items[0].progress += 1
          if(item?.inspection?.first_aids === 3) project[2].items[1].progress += 1
          if(item?.inspection?.electrical_prevention === 3) project[2].items[2].progress += 1
        } 
      })
      project[0].items[0].progress = project[0].items[0].progress / (numberOfCompanies * 3)

      project[1].items[3].progress = project[1].items[3].progress / numberOfCompanies
      project[1].items[4].progress = project[1].items[4].progress / numberOfCompanies
      project[1].items[5].progress = project[1].items[5].progress / numberOfCompanies
      project[1].items[6].progress = project[1].items[6].progress / numberOfCompanies

      project[2].items[0].progress = project[2].items[0].progress / numberOfCompanies
      project[2].items[1].progress = project[2].items[1].progress / numberOfCompanies
      project[2].items[2].progress = project[2].items[2].progress / numberOfCompanies
    }

    if(committee){
      const numberOfCompanies = committee.length

      committee.map((item:any) => {
        if(item?.ministry_labor_letter !== null){
          project[0].items[1].progress += 1
        }
        if(item?.inpsasel_report_date !== null){
          project[0].items[4].progress += 1
        }
        project[0].items[1].progress = project[0].items[1].progress / numberOfCompanies 
        project[0].items[4].progress = project[0].items[4].progress / numberOfCompanies 
      })
    }

    if(employee){
      const numberOfCompanies = committee.length
      const numberOfEmployees = employee.length

      const employeeCompanyIds = employee.map((item:any) => item?.company_id)
      const filteredId = employeeCompanyIds.filter((item:any, index:any, array:any) => {
        return array.indexOf(item) === index;
      })
      filteredId.map((item:any) => {
        let prevRep = 0
        let empRep = 0
        employee.map((current:any) => {
          if(current?.company_id === item && current?.status === "Activo"){
            if(current.preventionRepresentative === true) prevRep = 1
            if(current.employeerRepresentative === true) empRep = 1
          }
        })
        project[0].items[2].progress += prevRep
        project[0].items[3].progress += empRep
      })
      project[0].items[2].progress = project[0].items[2].progress / numberOfCompanies 
      project[0].items[3].progress = project[0].items[3].progress / numberOfCompanies 

      employee.map((item:any) => {
        if(item?.prevention_principles) project[3].items[0].progress += 1
        if(item?.route_format) project[3].items[1].progress += 1
        if(item?.rutagrama) project[3].items[2].progress += 1
      })
      project[3].items[0].progress = project[3].items[0].progress / numberOfEmployees
      project[3].items[1].progress = project[3].items[1].progress / numberOfEmployees
      project[3].items[2].progress = project[3].items[2].progress / numberOfEmployees
    }

    if(sysl){
      const numberOfCompanies = sysl.length

      sysl.map((item:any) => {
        const currentYear = `${new Date().getFullYear()}`
        if(item?.sysl_program !== null){
          const syslYear = item?.sysl_program?.substring(7)
          if(syslYear === currentYear) project[1].items[0].progress += 1
        }
        if(item?.prl !== null){
          const prlYear = item?.prl?.substring(7)
          if(prlYear === currentYear) project[1].items[1].progress += 1
        }
        if(item?.active_pause !== null){
          if(item?.active_pause?.first?.date !== null || item?.active_pause?.second?.date !== null) project[1].items[2].progress += 1
        }
      })
      project[1].items[0].progress = project[1].items[0].progress / numberOfCompanies
      project[1].items[1].progress = project[1].items[1].progress / numberOfCompanies
      project[1].items[2].progress = project[1].items[2].progress / numberOfCompanies
    }

    if(inspection){
      const numberOfCompanies = inspection.length
      inspection.map((item:any) => {
        if(item?.inspection_date) project[4].items[0].progress += 1
      })
      project[4].items[0].progress = project[4].items[0].progress / numberOfCompanies
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluations, committee, sysl, employee, inspection])

  return (
    <Card className="overflow-x-auto">
      <CardBody className="min-w-[700px]">
        {project.map((item: any, index: number) => (
          <div className="my-5" key={index}>
            <p className="font-bold text-lg text-primary dark:text-secondary mb-2">{item.title}</p>
            <div className="justify-center">
              {item.items.map((subitem: any, subindex: number) => (
                <div key={subindex} className="border-b border-slate-200 dark:border-slate-800 py-2">
                  {subindex === 0 && (
                    <div  className="flex justify-between items-center gap-2 font-bold bg-slate-200 dark:bg-zinc-800 py-2">
                      <p className="w-full text-center border-r border-slate-200 dark:border-slate-800">Item</p>
                      <p className="w-full text-center">Progreso</p>
                      {currentProject.length === 19 && (
                        <>
                          <p className="w-full text-center border-x border-slate-200 dark:border-slate-800">Inicio</p>
                          <p className="w-full text-center">Fin</p>
                        </>
                      )}
                    </div>
                  )}
                  <div  className="mt-2 flex justify-between items-center gap-2 font-semibold">
                    <p className="w-full">+ {subitem.title}</p>
                    <div className="w-full flex gap-2 items-center">
                      <p>{subitem.progress.toFixed(2) * 100}%</p>
                      <Progress aria-label="Project progress bar" className="dark:hidden" color="primary" value={subitem.progress*100}/>
                      <Progress aria-label="Project progress bar dark" className="dark:flex hidden" color="secondary" value={subitem.progress*100}/>
                    </div>
                    {currentProject.length === 19 && (
                      <>
                        <div className="w-full flex justify-center">
                          <EditDate type="start" currentProject={currentProject} id={subitem?.id} getProject={getProject} />
                        </div>
                        <div className="w-full flex justify-center">
                          <EditDate type="end" currentProject={currentProject} id={subitem?.id} getProject={getProject} />
                        </div>
                      </>
                    )}
                  </div>                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>    
  )
}
