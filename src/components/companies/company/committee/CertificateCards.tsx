"use client"

import { useForm } from "react-hook-form";
import FileIcon from "@/components/icons/FileIcon";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

type CertificateCardsProps = {
  title: string
  companyId: number
}

type FormValues = {
  status: string
}

export default function CertificateCards({title, companyId} : CertificateCardsProps) {
  const { register, handleSubmit } = useForm<FormValues>()

  const [status, setStatus] = useState("")

  const getStatus = async (data: string) => {
    const res = await fetch(`/api/committee/get-committee?query=${companyId}&data=${data}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    const resData = await res.json()
    setStatus(resData.message.center_certificate || resData.message.delegate_certificate || resData.message.committee_certificate)
  }

  const onChange = handleSubmit(async data => {
    let res

    if(title === "Certificado del Comité"){
      res = await fetch(`/api/committee/update-committee?query=${companyId}`, {
        method: "PUT",
        body: JSON.stringify({ committee_certificate: data.status }),
        headers: {
          "Content-Type" : "application/json"
        }
      })

      if(res.ok) getStatus("committee")
    }

    if(title === "Certificado del Centro"){
      res = await fetch(`/api/committee/update-committee?query=${companyId}`, {
        method: "PUT",
        body: JSON.stringify({ center_certificate: data.status }),
        headers: {
          "Content-Type" : "application/json"
        }
      })
      if(res.ok) getStatus("center")
    }

    if(title === "Certificado del Delegado"){
      res = await fetch(`/api/committee/update-committee?query=${companyId}`, {
        method: "PUT",
        body: JSON.stringify({ delegate_certificate: data.status }),
        headers: {
          "Content-Type" : "application/json"
        }
      })
      if(res.ok) getStatus("delegate")
    }

    return res
  })

  useEffect(() => {
    if(title === "Certificado del Comité") getStatus("committee")
    if(title === "Certificado del Centro") getStatus("center")
    if(title === "Certificado del Delegado") getStatus("delegate")
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="w-full lg:w-80">
      <CardBody className="px-5 flex flex-row items-center justify-center gap-5">
        <div className={`rounded-full ${(status === "No Posee") ? "bg-danger" : (status === "Nuevo" || status === "En Espera") ? "bg-warning" : (status === "Aprobado" || status === "Actualizado") ? "bg-success" : !status && "bg-primary-500"} p-3 text-white dark:text-black`}>
          <FileIcon />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <h3 className={`text-md ${(status === "No Posee") ? "text-danger" : (status === "Nuevo" || status === "En Espera") ? "text-warning" : (status === "Aprobado" || status === "Actualizado") ? "text-success" : !status && "text-primary-500"} font-medium`}>{title}</h3>

          {status && (
            <Select
              size="sm"
              disallowEmptySelection
              defaultSelectedKeys={[status]}
              {...register("status", {
                onChange: e => onChange(e.target.value)
              })}
            >
              <SelectItem key="No Posee" value="No Posee">No Posee</SelectItem>
              <SelectItem key="Nuevo" value="Nuevo">Nuevo</SelectItem>
              <SelectItem key="En Espera" value="En Espera">En Espera</SelectItem>
              <SelectItem key="Aprobado" value="Aprobado">Aprobado</SelectItem>
              <SelectItem key="Actualizado" value="Actualizado">Actualizado</SelectItem>
            </Select>
          )}

        </div>
      </CardBody>
    </Card>
  )
}
