"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input, Button, Select, SelectItem } from "@nextui-org/react"
import LogMessage from "@/components/LogMessage"
import type { Log } from "@/types"
import type { LegalRepresentative } from "@/types"

type AddLegalRepresentativeProps = {
  id: number
  getLegalRepresentative: (id: number) => Promise<void>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  legalRepresentatives: any[]
  handleSelection: (e: any) => void
  legalRepresentative?: any
  setLegalRepresentative: React.Dispatch<React.SetStateAction<LegalRepresentative>>
}

type LegalRepresentativeForm = Omit<LegalRepresentative, "id">

export default function AddLegalRepresentative({ id, getLegalRepresentative, setEdit, legalRepresentatives, handleSelection, legalRepresentative, setLegalRepresentative } : AddLegalRepresentativeProps) {
  const { register, formState: {errors}, handleSubmit } = useForm<LegalRepresentativeForm>();

  const [log, setLog] = useState<Log>({type: "", message: ""})
  const [send, setSend] = useState(false)

  const handleCreate = handleSubmit(async data => {
    data = {
      ...data, 
      id_number: `${data.id_type}${data.id_number}`
    }

    delete data.id_type

    const res = await fetch("/api/legal-representative/add-legal-representative", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        company_id: id,
      }),
      headers: {
        "Content-Type" : "application/json"
      }
    })

    if(res.ok){
      setLog({
        type: "success",
        message: "Empresa agregada"
      })
      getLegalRepresentative(id)
      setEdit(false)
    }else{
      setLog({
        type: "error",
        message: res.statusText
      })
    }
  })

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar al representante legal?")
    if(!confirm) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await fetch(`/api/legal-representative/delete-legal-representative`, {
      method: "DELETE",
      body: JSON.stringify({id: +legalRepresentative.id}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      setEdit(false)
      getLegalRepresentative(id)
  }

  const handleEdit =  handleSubmit(async () => {
    setSend(true)
  })

  useEffect(() => {
    if(send === true){
      const request = async () => {
        const res = await fetch("/api/legal-representative/update-legal-representative", {
          method: "PUT",
          body: JSON.stringify(legalRepresentative),
          headers: {
            "Content-Type" : "application/json"
          }
        })
    
        if(res.ok){
          setLog({
            type: "success",
            message: "Empresa agregada"
          })
          getLegalRepresentative(id)
          setEdit(false)
        }else{
          setLog({
            type: "error",
            message: res.statusText
          })
        }
      }
      request()
    }

    setSend(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  return (
    <div className="w-full flex flex-col gap-2">
      {!legalRepresentative?.id_number ? (
        <form className="w-full flex flex-col gap-2" onSubmit={handleCreate}>
          <p className="text-md font-medium text-primary dark:text-secondary">{legalRepresentative?.id ? "Editar: " : "Crear Nuevo: "}</p>

          <Input 
              type="text"
              size="sm"
              label="Nombre Completo"
              isInvalid={errors.name && true}
              errorMessage={errors?.name?.message}
              {...register("name", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              })}
            />

          <div className="flex gap-2">
            <Select
              size="sm"
              className="w-24"
              label="Tipo"
              defaultSelectedKeys={["V"]}
              disallowEmptySelection
              {...register("id_type")}
            >
              <SelectItem key="V" value="V">V</SelectItem>
              <SelectItem key="J" value="J">J</SelectItem>
              <SelectItem key="E" value="E">E</SelectItem>
            </Select>

            <Input 
              type="number"
              size="sm"
              label="Número de Cédula"
              maxLength={8}
              isInvalid={errors.id_number && true}
              errorMessage={errors?.id_number?.message}
              {...register("id_number", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              })}
            />
          </div>


          <Input 
            type="number"
            size="sm"
            label="Número Telefónico"
            isInvalid={errors.phone_number && true}
            errorMessage={errors?.phone_number?.message}
            {...register("phone_number", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            })}
          />

          {log.type && <LogMessage log={log} />}

          <Button
            size="sm" 
            className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
            type="submit"
          >
            Guardar
          </Button>
        </form>
        ) : (
          <form className="w-full flex flex-col gap-2" onSubmit={handleEdit}>
            <p className="text-md font-medium text-primary dark:text-secondary">{legalRepresentative?.id ? "Editar: " : "Crear Nuevo: "}</p>

              <Input 
              type="text"
              size="sm"
              label="Nombre Completo"
              value={legalRepresentative?.name}
              onChange={e => setLegalRepresentative({...legalRepresentative, name: e.target.value})}
            />

            <div className="flex gap-2">
              <Select
                size="sm"
                className="w-24"
                label="Tipo"
                defaultSelectedKeys={[(legalRepresentative.id_number[0] === "V" || legalRepresentative.id_number[0] === "E" || legalRepresentative.id_number[0] === "J") ? legalRepresentative.id_number[0] : "V"]}
                onSelectionChange={e => setLegalRepresentative({...legalRepresentative, id_number: `${e.currentKey}${legalRepresentative.id_number.substring(1)}`})}
                disallowEmptySelection
              >
                <SelectItem key="V" value="V">V</SelectItem>
                <SelectItem key="J" value="J">J</SelectItem>
                <SelectItem key="E" value="E">E</SelectItem>
              </Select>

              <Input 
                type="number"
                size="sm"
                label="Número de Cédula"
                defaultValue={legalRepresentative.id_number.substring(1)}
                onChange={e => setLegalRepresentative({...legalRepresentative, id_number: `${legalRepresentative.id_number[0]}${e.target.value}`})}
              />
            </div>


            <Input 
              type="number"
              size="sm"
              label="Número Telefónico"
              maxLength={14}
              value={legalRepresentative?.phone_number}
              onChange={e => setLegalRepresentative({...legalRepresentative, phone_number: e.target.value})}
            />

            {log.type && <LogMessage log={log} />}

            <Button
              size="sm" 
              className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
              type="submit"
            >
              Guardar
            </Button>

            <Button size="sm" variant="bordered" className="w-full text-danger border-danger font-medium text-lg" onPress={handleDelete}>Eliminar</Button>
          </form>
        )}

      <p className="text-md font-medium text-primary dark:text-secondary">Elejir uno existente: </p>
      <Select size="sm" onChange={handleSelection}>
        {legalRepresentatives && legalRepresentatives.map(lr => (
          <SelectItem key={lr.id}>{lr.name}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
