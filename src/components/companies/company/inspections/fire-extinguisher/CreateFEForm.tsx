import LogMessage from '@/components/LogMessage'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type CreateEmployeeFormProps = {
  companyId: number
  getFireExtinguishers: (id: number) => Promise<void>
  setLog: React.Dispatch<React.SetStateAction<{
    type: string;
    message: string;
  }>>
  log: {
    type: string;
    message: string;
  }
}

export default function CreateFEForm({companyId, log, setLog, getFireExtinguishers} : CreateEmployeeFormProps) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const formatter = useDateFormatter({dateStyle: "medium"})

  const [expirationDate, setExpirationDate] = useState<any>(parseDate("2024-04-04"))
  const [booleanValues, setBooleanValues] = useState({
    maintenance: false,
    free_of_obstacles: false,
    activation_lever: false,
    carrying_handle: false,
    safety_seal: false,
    pressure_gauge: false,
    cylinder: false,
    labels: false,
    hose: false,
    hose_holder: false,
    nozzle: false,
  })

  const createFE = async (data: any) => {
    const res = await fetch("/api/inspections/add-fire-extinguisher", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Extintor agregado"
      })
      getFireExtinguishers(companyId)
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }
    return res
  }

  const onSubmit = handleSubmit(async data => {
    data = {
      ...data,
      expiration_date: formatter.format(expirationDate.toDate(getLocalTimeZone())),
      maintenance: booleanValues.maintenance,
      free_of_obstacles: booleanValues.free_of_obstacles,
      activation_lever: booleanValues.activation_lever,
      carrying_handle: booleanValues.carrying_handle,
      safety_seal: booleanValues.safety_seal,
      pressure_gauge: booleanValues.pressure_gauge,
      cylinder: booleanValues.cylinder,
      labels: booleanValues.labels,
      hose: booleanValues.hose,
      hose_holder: booleanValues.hose_holder,
      nozzle: booleanValues.nozzle,
      company_id: +companyId,
    }

    setLog({
      type: "",
      message: ""
    })

    const res = await createFE(data)

    if(res.ok){
      reset()
      onOpenChange()
    }else{
      alert("Error al agregar extintor")
    }
  })

  return (
    <>
      <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Agregar Extintor</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">Agregar Extintor</ModalHeader>
                <ModalBody className="flex flex-col gap-5">

                <Input 
                  type="text"
                  label="Ubicación"
                  isInvalid={errors.location && true}
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
                />

                <DateInput 
                  size="sm"
                  label="Fecha de Vencimiento"
                  value={expirationDate}
                  onChange={setExpirationDate}
                />

                <Select
                  className="w-full"
                  label="Tipo de Carga y Fuego"
                  defaultSelectedKeys={["PQS/ABC"]}
                  isInvalid={errors.type_of_charge_and_fire && true}
                  disallowEmptySelection
                  {...register("type_of_charge_and_fire", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
                >
                  <SelectItem key="PQS/ABC" value="PQS/ABC">PQS/ABC</SelectItem>
                  <SelectItem key="CO2/BC" value="CO2/BC">CO2/BC</SelectItem>
                </Select>

                <Input
                  className="w-full"
                  type="number"
                  label="Capacidad (Lbs)"
                  maxLength={2}
                  isInvalid={errors.capacity && true}
                  {...register("capacity", {
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }
                  })}
                />

                <div className='grid grid-cols-2 gap-2'>
                  <RadioGroup 
                    label="Mantenimiento al Día"
                    value={booleanValues.maintenance ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, maintenance: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Libre de Obstáculos"
                    value={booleanValues.free_of_obstacles ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, free_of_obstacles: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Palanca de Activación"
                    value={booleanValues.activation_lever ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, activation_lever: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Manilla de Acarreo"
                    value={booleanValues.carrying_handle ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, carrying_handle: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Precinto de Seguridad"
                    value={booleanValues.safety_seal ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, safety_seal: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Manómetro de Carga"
                    value={booleanValues.pressure_gauge ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, pressure_gauge: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Cilíndro"
                    value={booleanValues.cylinder ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, cylinder: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Etiquetas"
                    value={booleanValues.labels ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, labels: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Manguera"
                    value={booleanValues.hose ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, hose: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Sujetador de Manguera"
                    value={booleanValues.hose_holder ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, hose_holder: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>

                  <RadioGroup 
                    label="Tobera"
                    value={booleanValues.nozzle ? "Si" : "No"}
                    onChange={e => setBooleanValues({...booleanValues, nozzle: e.target.value === "Si"})}
                    orientation="horizontal"
                  >
                    <Radio key="yes" value="Si">Si</Radio>
                    <Radio key="no" value="No">No</Radio>
                  </RadioGroup>
                </div>

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
