"use client"

import { useForm } from "react-hook-form"
import { useState } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem, Checkbox, RadioGroup, Radio, DateInput } from "@nextui-org/react"
import LogMessage from "@/components/LogMessage";
import type { EmployeeFormValues } from "@/types";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import { useEmployee } from "@/hooks/useEmployee";

import {useDateFormatter} from "@react-aria/i18n";
import { calculateTranscurredYears, dateComparator } from "@/app/utils/dateFormatter";

type AddEmployeeProps = {
  companyId: number
}

export default function CreateEmployeeForm({ companyId } : AddEmployeeProps) {
  const { createEmployee, log, setLog } = useEmployee()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<EmployeeFormValues>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
  const [birthdate, setBirthdate] = useState<any>(parseDate("2024-04-04"))
  const [hireDate, setHireDate] = useState<any>(parseDate("2024-04-04"))

  const [status, setStatus] = useState<string>()
  const [terminationDate, setTerminationDate] = useState<any>(parseDate("2024-04-04"))

  const formatter = useDateFormatter({dateStyle: "medium"})

  const onSubmit = handleSubmit(async data => {       
    data = {
      ...data,
      id_number: `${data.id_type}${data.id_number}`
    }

    delete data.id_type

    const aditionalData = {
      companyId: companyId,
      birthdate: formatter.format(birthdate.toDate(getLocalTimeZone())),
      hireDate: formatter.format(hireDate.toDate(getLocalTimeZone())),
      terminationDate: status === "Retirado" ? formatter.format(terminationDate.toDate(getLocalTimeZone())) : null,
      status: status,
    }

    const employeeAge = calculateTranscurredYears(aditionalData.birthdate)
    const dateValidation = dateComparator(aditionalData.terminationDate, aditionalData.hireDate)

    if(employeeAge > 99){
      setLog({
        type: "error",
        message: "La edad del empleado está fuera del rango..."
      })
      return
    }

    if(dateValidation){
      setLog({
        type: "error",
        message: "La fecha de contratación no puede ser mayor a la fecha de retiro del empleado..."
      })
      return
    }

    setLog({
      type: "",
      message: ""
    })

    const res = await createEmployee(data, aditionalData)

    if(res.ok){
      reset()
    }else{
      alert("Error al agregar empleado")
    }

  })

  return (
    <>
      <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Agregar Empleado</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={onSubmit} >
                <ModalHeader className="flex flex-col gap-1">Agregar Empleado</ModalHeader>
                <ModalBody className="flex flex-col gap-5">

                <p>Datos Personales</p>
                <Input 
                  type="text"
                  label="Nombre Completo"
                  isInvalid={errors.name && true}
                  errorMessage={errors?.name?.message}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                    }
                  )}
                />

                <div className="flex gap-2">
                  <Select
                    className="w-24"
                    label="Tipo"
                    defaultSelectedKeys={["V"]}
                    errorMessage={errors.id_type?.message}
                    isInvalid={errors.id_type && true}
                    disallowEmptySelection
                    {...register("id_type", {
                      required: {
                        value: true,
                        message: "El Tipo de Cédula es Obligatorio..."
                      }
                    })}
                  >
                    <SelectItem key="V" value="V">V</SelectItem>
                    <SelectItem key="J" value="J">J</SelectItem>
                    <SelectItem key="E" value="E">E</SelectItem>
                  </Select>

                  <Input
                    className="w-full"
                    type="number"
                    label="Cédula"
                    maxLength={8}
                    errorMessage={errors.id_number?.message}
                    isInvalid={errors.id_number && true}
                    {...register("id_number", {
                      required: {
                        value: true,
                        message: "El número de cédula es obligatorio..."
                      }
                    })}
                  />
                </div>

                <Input 
                  type="number"
                  label="Teléfono"
                  maxLength={14}
                  isInvalid={errors.phone_number && true}
                  errorMessage={errors?.phone_number?.message}
                  {...register("phone_number", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                    }
                  )}
                />
                
                <Select
                  label="Sexo"
                  errorMessage={errors.gender?.message}
                  isInvalid={errors.gender && true}
                  disallowEmptySelection
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
                >
                  <SelectItem key="Masculino" value="Masculino">Masculino</SelectItem>
                  <SelectItem key="Femenino" value="Femenino">Femenino</SelectItem>
                </Select>

                <DateInput 
                  size="sm"
                  label="Fecha de Nacimiento"
                  value={birthdate}
                  onChange={setBirthdate}
                  maxValue={today(getLocalTimeZone())}
                />

                <p>Datos de la Empresa</p>
                <Input
                  type="text"
                  label="Cargo"
                  isInvalid={errors.position && true}
                  errorMessage={errors?.position?.message}
                  {...register("position", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    },
                  })}
                />

                <Checkbox {...register("employeerRepresentative")}>
                  Representante Patronal
                </Checkbox>
                <Checkbox {...register("preventionRepresentative")}>
                  Delegado de Prevención
                </Checkbox>

                <Checkbox {...register("committee_delegate")}>
                  Delegado de Comité
                </Checkbox>
                <Checkbox {...register("committee_second_postulate")}>
                  Segundo Postulado (Comité)
                </Checkbox>
                <Checkbox {...register("committee_elections")}>
                  Comisión Electoral
                </Checkbox>


                <DateInput 
                  size="sm"
                  label="Fecha de Contratación"
                  value={hireDate}
                  onChange={setHireDate}
                  maxValue={today(getLocalTimeZone())}
                />

                <Checkbox {...register("route_format")}>
                  Formato de Recorrido
                </Checkbox>
                <Checkbox {...register("prevention_principles")}>
                  Principios de Prevención
                </Checkbox>
                <Checkbox {...register("rutagrama")}>
                  Rutagrama
                </Checkbox>

                <RadioGroup 
                  label="Estado del Trabajador"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <Radio key="active" value="Activo">Activo</Radio>
                  <Radio key="inactive" value="Retirado">Retirado</Radio>
                </RadioGroup>

                {status === "Retirado" && (
                  <DateInput 
                    size="sm"
                    label="Fecha de Retiro"
                    value={terminationDate}
                    onChange={setTerminationDate}
                    maxValue={today(getLocalTimeZone())}
                  />
                )}

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
